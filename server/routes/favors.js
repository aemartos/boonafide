const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Favor = require("../models/Favor");
const {isLoggedIn} = require('../middlewares/isLogged');
const { CATEGORIES_ENUM } = require('../config/constants');


router.get('/searchBar', isLoggedIn, (req, res, next) => {
  console.log(req.body.data);
  User.findById(req.user._id, {...req.body.data, newUser: false})
    .then(() => {
      res.json({success: true})
    })
    .catch(err => next(err))
});


router.get('/offerFavors', isLoggedIn, (req, res, next) => {
  User.findById(req.user._id, {...req.body.data, newUser: false})
  .then((user) => {
      const categories = user.offerCategories.length === 0 ? CATEGORIES_ENUM : user.offerCategories;
      Favor.find({
        type: "need",
        $or: categories.map(c=>{return {categories: c}})
        //creatorId: {$ne: req.user._id}
      })
      .limit(10)
      //.skip(req.params.offset || 0)
      .sort({ createdAt: -1 })
      .then(favors => {
        console.log(favors);
        res.json({favors});
      });
    })
    .catch(err => next(err))
});


router.get('/nearbyFavors', isLoggedIn, (req, res, next) => {
  console.log(req.body.data);
  User.findById(req.user._id)
    .then((user) => {
      Favor.find({
        location: {
          $near: {
            $geometry: {
              type: "Point" ,
              coordinates: [ user.location.coordinates[0] , user.location.coordinates[1] ]
            },
            $maxDistance: 10000
          }
        }
      })
      .limit(20)
      //.skip(req.params.offset || 0)
      .sort({ createdAt: -1 })
      .then(favors => res.json({favors}));
    })
    .catch(err => next(err))
});





module.exports = router;
