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

    const imageUID = req.file.location.split('/')[4].split('-')[0];

    const request = await ImageRequest.create({
        userId: req.params.id,
        UID: imageUID,
        fileURL: `${req.file.location}`,
        uploadDate: new Date,
        style: req.body.style
    })
    await request.save()

    res.status(200);
    res.json({
        message: `User ${req.params.id} successfully uploaded image to S3 bucket`,
        url: `${req.file.location}`
    });
});

router.get("/user/:id", async function(req, res) {
    console.log(req.params.id);
    const imageRequests = ImageRequest.find({
        userId: req.params.id
        }
    )
    await imageRequests.exec()
        .then((query) => {
            console.log(query);
            res.json(query)
        })
        .catch((e) => {
            console.log(`Could not find images for user ${req.params.id}`);
            res.json({message: `Could not find images for user ${req.params.id}`})
        })
})

router.get("/mostrecent", async function(req, res) {
    const imageRequests = ImageRequest.find(
    )
    await imageRequests.exec()
        .then((query) => {
            console.log(query);
            res.json(query);
        })
        .catch((e) => {
            console.log(`Could not find any image requests`);
            res.json({message: "Could not find any image requests"})
        })
})

router.delete("/delete", async function (req, res) {
    const imageToDelete = ImageRequest.findOneAndDelete({
            fileURL: req.body.fileURL
        }
    )
    await imageToDelete.exec()
        .then(query => {
            console.log(`Deleted imagerequest from database: ${query}`)
            res.json({message: `Deleted imagerequest from database: ${query}`})
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        });
})

module.exports = router;