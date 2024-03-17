//--App Modules--
const express = require("express");
const cors = require('cors')
const app = express();

//--BodyParser--
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use Cors Middleware
app.use(cors());

//--DB Modules--
const mongoose = require('mongoose');

//--Connect to MongoDB--
// DB config
const db_name       = process.env.DB_NAME || "FaceStylizerDB";
const mongoUrl      = process.env.MONGO_URL || "mongodb://root:password@localhost:27017";
const mongooseUrl   = process.env.MONGOOSE_URL || `${mongoUrl}/${db_name}?authSource=admin`;

//express router: import routes we defined
const apiRouter = require('./routes/user');

// Connect to DB
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongooseUrl).then((connection) => {
        console.log(`Successfully connected to ${db_name}`);
    }).catch((e) => {
        console.log(`Cannot connect to ${db_name}`);
        console.log(e);
        console.log(e.message);
        process.exit(1);
    });

    // Mount apiRouter
    app.use(apiRouter);

    // Handle page not found:
    // gets triggered when a request is made to
    // an undefined route
    app.use((req, res, next) => {
        const error = new Error("Not Found, Please Check URL!");
        error.status = 404;
        next(error);
    })
}

// Start Listening on Port
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});