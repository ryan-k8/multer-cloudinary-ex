const cloudinary = require('cloudinary').v2;
const {MulterError} = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedFormats = ['image/jpeg','image/jpg','image/png'];

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req,file)=> {
      
      if (!allowedFormats.includes(file.mimetype)) {
           const err = new MulterError();
           err.message = 'file of this type not allowed';
           throw err;
      }
      return {
         folder: process.env.CLOUDINARY_FOLDER_NAME,
         allowedFormats: ['jpeg','png','jpg'],
        // public_id: uniqueFileName (filename on storage,defaults to random)
        }
    },

});

module.exports = {
    cloudinary,
    storage,
}

