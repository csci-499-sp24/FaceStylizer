const express = require("express");
const router = express.Router();
const uploadImage = require("../utilities/uploadImage");
const {ImageRequest} = require("../models/ImageRequest");
const short = require('short-uuid');

// File S3 Object Requests Format
// req.file = {
//     fieldname, // will be image for imageuploads
//     originalname, // name of user's file @ time of upload
//     mimetype, // AWS MIMEType
//     size, // size of payload
//     bucket, // bucket object belongs to
//     key, // our convention: username/id + "-" + timestamp + "-" + originalfilename
//     location // URL to S3 object
// }

//--File Endpoints (CRUD)--

// Upload Image File With UserID
// Takes in an image as multipart form data and uploads this to the S3 facestlyizer bucket using the following naming convention
// Naming format: Unique User Identifier (Email or Username), Timestamp - Original Name of File, concatenated with dashes
// Upload and file processing logic located in utilities/uploadImage.js

router.post("/upload/:id", uploadImage.single("image"), async (req, res, next) => {
    console.log(`User ${req.params.id} successfully uploaded image to S3 bucket, accessible with URL: ${req.file.location}`)
    console.log(req.file);

    res.status(200);
    res.json({
        message: `User ${req.params.id} successfully uploaded image to S3 bucket`,
        url: `${req.file.location}`
    });
});

module.exports = router;