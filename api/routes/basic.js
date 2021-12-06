const express = require("express")
const router = express.Router()
const connection = require("../controller/connection.controller");

// /api/connection: GET, POST, DELETE
// /api/connection/:id: GET, PUT, DELETE
// /api/connection/published: GET


// Retrieve all connection
router.get("/", connection.connections);
router.get("/database/:database", connection.database);
router.get("/database/:database/:collection", connection.collection);

//router.get("/:id", connection.findOne);

//router.put("/:id", connection.update);

//router.delete("/:id", connection.delete);

//router.delete("/", connection.deleteAll);

module.exports = router