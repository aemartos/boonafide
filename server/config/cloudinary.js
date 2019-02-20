const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storageProfilePictures = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'profile-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var storageFavorPictures = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'favor-pictures',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadProfilePicture = multer({ storage: storageProfilePictures });
const uploadFavorPictures = multer({ storage: storageFavorPictures });

module.exports = { uploadProfilePicture, uploadFavorPictures }
