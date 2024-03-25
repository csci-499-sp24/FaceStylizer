const express = require("express");
const router = express.Router();
const uploadImage = require("../utilities/uploadImage");

//--File Endpoints (CRUD)--

// update profile image
router.post("/upload/:id", uploadImage.single("image"), async (req, res, next) => {

    console.log(`User ${req.params.id} successfully uploaded ${req.file.key} to S3 bucket, accessible with URL: ${req.file.location}`)
    console.log(req.file);

    res.status(200);
    res.json({
        message: `User ${req.params.id} successfully uploaded ${req.file.key} to S3 bucket, accessible with URL: ${req.file.location}`
    })

    // MongoDB Changes to go here when implemented
    }
)


module.exports = router;