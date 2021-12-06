const { arrayBuffer } = require("stream/consumers");
const { url } = require("../config/db.config");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabaseCollections = async (databaseName) => {
    return MongoClient.connect(url).then(async client => {
        const collectionObject = client.db(databaseName).listCollections()
        let collectionsList = await collectionObject.toArray();
        return collectionsList
    })
}

const getCollectionData = async (databaseName, collectionName, sort = {}, skip = 0, limit = 20, query = {}) => {
    // sort in descending (-1) ascending (1) order by length const sort = { length: 1, author: 1 };
    // omit the first two documents skip : 2,
    // { "_id": 1, "name": "apples", "qty": 5, "rating": 3 }, conditioning like where in sql  - const query = { "name": "James" };
    return MongoClient.connect(url).then(async client => {
        const cursor = client.db(databaseName).collection(collectionName).find(query).sort(sort).limit(limit).skip(skip);
        const data = await cursor.toArray();
        return data
    })
    //example call - getCollectionData('shoutty', 'categories', { name: 1 }, 1, 20, {})
}

//http://localhost:3000/api/connection/database/shoutty/subcategories
exports.collection = async (req, res) => {
    const database = req.params.database;
    const collection = req.params.collection;
    getCollectionData(database, collection, {}, 0, 20, {}).then((collections) =>
        res.status(200).send(collections))
        .finally(() => client.close());

}

//http://localhost:3000/api/connection/database/shoutty
exports.database = async (req, res) => {
    const database = req.params.database;
    getDatabaseCollections(database).then(collections =>
        res.status(200).send(collections)
    ).finally(() => client.close());
};

//http://localhost:3000/api/connection
exports.connections = async (req, res) => {
    const databasesWithCollections = []
    client
        .connect()
        .then(client =>
            client
                .db()
                .admin()
                .listDatabases()
        )
        .then(async (dbs) => {
            const { databases } = dbs;
            for await (const collectionList of databases.map(eachDb => {
                return getDatabaseCollections(eachDb.name).then(collectionData => {
                    eachDb.collections = collectionData
                    return eachDb
                })
            })) {
                databasesWithCollections.push(collectionList);
            }
        }).then(() =>
            res.status(200).send(databasesWithCollections))
        .finally(() => client.close());
};


// Create and Save a new blog
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a blog
    const blog = new Blog({
        author: req.body.author,
        content: req.body.content,
        published: req.body.published ? req.body.published : false
    });

    // Save blog in the database
    blog
        .save(blog)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the blog."
            });
        });

};


// Find a single blog with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found blog with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving blog with id=" + id });
        });

};

// Update a blog by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Blog with id=${id}. Maybe Blog was not found!`
                });
            } else res.send({ message: "Blog was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Blog with id=" + id
            });
        });

};

// Delete a blog with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
                });
            } else {
                res.send({
                    message: "Blog was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });

};

// Delete all blogs from the database.
exports.deleteAll = (req, res) => {
    Blog.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Blogs were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all blogs."
            });
        });
};

// Find all published blogs
exports.findAllPublished = (req, res) => {
    Blog.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving blogs."
            });
        });
};