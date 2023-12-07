// Change the import of 'dotenv' to use require syntax
// const dotenv = require('dotenv');
const multer = require('multer');

// dotenv.config();

// const URL = process.env.MONGO_URI;

// Instead of using import syntax, use require syntax for GridFsStorage
const { GridFsStorage } = require('multer-gridfs-storage-angler');

const URL = process.env.MONGO_URI
console.log(URL);
const storage = new GridFsStorage({
    url: URL,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg","application/pdf","image/jpeg"];

        // if (file.size > 1024 * 1024 * 1024) { // 1MB limit
        //     return false; // Reject the upload
        // }

        if (match.indexOf(file.mimetype) === -1) {
            return `blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `blog-${file.originalname}`
        };
    }
});

// Use require syntax for 'multer' instead of export default
const upload = multer({ storage });
module.exports = upload;

