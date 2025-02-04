const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');


const uploadToCloudinary = async (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "Perfume",
                resource_type: "auto"
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        const bufferStream = Readable.from(buffer);
        bufferStream.pipe(stream);
    });
};

module.exports = uploadToCloudinary;