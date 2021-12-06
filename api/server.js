const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()


const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

var corsOptions = {
    origin: 'http://localhost:3000' //incoming request url
}
app.use(cors(corsOptions))

// routes
const basic = require('./routes/basic')
app.use('/api/connection', basic)

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});