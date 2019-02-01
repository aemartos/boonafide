const express = require("express");
const router = express.Router();
const User = require("../models/User");
const parser = require('../config/cloudinary.js');
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');


router.post('/first-user/pictures', isLoggedIn, parser.single('picture'), (req, res, next) => {
  console.log("nosequeeeeeeeeee")
  console.log(req.user._id)
  User.findOneAndUpdate({}, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});

router.post('/pictures', isLoggedIn, parser.single('picture'), (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
    .catch(err => next(err))
});

module.exports = router;
