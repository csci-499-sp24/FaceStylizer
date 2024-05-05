const {S3Client} = require("@aws-sdk/client-s3");
const {PutObjectCommand} = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3');
const {ImageRequest} = require("../models/ImageRequest");
const { uuid } = require('uuidv4');
const short = require('short-uuid');
require('dotenv').config();

const client = new S3Client({
    region: process.env.REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID
    }
});

// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {
    // Define the allowed extension
    const fileExts = ["png", "jpg", "jpeg", "gif"];

    // Check allowed extensions
    const extension = file.originalname.split('.').pop();
    const isAllowedExt = (fileExts.includes(extension));

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true);
    } else {
        cb("Error: File type not allowed!");
    }
}

// our middleware
const uploadImage = multer({
    // storage: s3Storage,
    storage: multerS3({
        s3: client,
        bucket: "facestylizerbucket",
        metadata: (req, file, cb) => {
            cb(null, {fieldname: file.fieldname})
        },
        key: async (req, file, cb) => {
            const uid = short.generate();
            const request = await ImageRequest.create({
                userId: req.params.id,
                UID: short.generate(),
                fileURL: `https://facestylizerbucket.s3.us-east-2.amazonaws.com/user-uploads/${req.params.id}/${uid}-${file.originalname}`,
                uploadDate: new Date
            })
            await request.save()
            const fileName = "user-uploads/" + `${req.params.id}/` + uid + "-" + file.originalname;
            cb(null, fileName);
        }
    }),
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
})

module.exports = uploadImage;