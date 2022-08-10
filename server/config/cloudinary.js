const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storageProfilePictures = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile-pictures',
    allowed_formats: ['jpg', 'png'],
    public_id: (_, file) => file.originalname,
  }
});

var storageFavorPictures = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'favor-pictures',
    allowed_formats: ['jpg', 'png'],
    public_id: (_, file) => file.originalname,
  }
});

const uploadProfilePicture = multer({ storage: storageProfilePictures });
const uploadFavorPictures = multer({ storage: storageFavorPictures });

module.exports = { uploadProfilePicture, uploadFavorPictures };
