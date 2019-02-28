const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {uploadProfilePicture} = require('../config/cloudinary.js');
const {isLoggedIn} = require('../middlewares/isLogged');


router.post('/pictures', isLoggedIn, uploadProfilePicture.single('picture'), (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { pictureUrl: req.file.secure_url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.secure_url
      })
    })
    .catch(err => next(err))
});

router.post('/updateUser', isLoggedIn, (req, res, next) => {
  //console.log(req.body.data);
  User.findByIdAndUpdate(req.user._id, {...req.body.data, newUser: false})
    .then(() => {
      res.json({success: true})
    })
    .catch(err => next(err))
});

router.get('/:userId', isLoggedIn, (req, res, next) => {
  User.findById(req.params.userId).populate('favOffer').populate('favNeed').populate('currentHelped').populate('favDone').populate('favReceived')
    .populate({ path: "notificationsId", populate: { path: "favorId" }})
    .populate({ path: "notificationsId", populate: { path: "personId" }})
    .populate({ path: "notificationsId", populate: { path: "receiverId" }})
    .populate({ path: "notificationsId", populate: { path: "ticketId" }})
      .then(user => res.json(user))
      .catch(err => next(err))
});





module.exports = router;
