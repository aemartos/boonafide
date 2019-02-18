const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Favor = require("../models/Favor");
const {isLoggedIn} = require('../middlewares/isLogged');
const { CATEGORIES_ENUM } = require('../config/constants');


router.get('/allFavors', isLoggedIn, (req, res, next) => {
  Favor.find()
    .sort({ createdAt: -1 })
    //.skip(parseInt(req.query.offset || 0))
    //.limit(15)
    .then(favors => res.json({favors}))
    .catch(err => next(err));
});

router.get('/search', isLoggedIn, (req, res, next) => {
  let {query} = req.query;
  let regex = new RegExp(query, "gi");
  Favor.find({$or: [
    {"name": regex},
    {"description": regex},
    {"creatorId.username": regex},
    {"categories": regex},
    ]})
    .populate('creatorId')
    .sort({ createdAt: -1 })
    //.skip(parseInt(req.query.offset || 0))
    //.limit(30)
    .then(favorsUnfiltered => {
      let filterFavs = favorsUnfiltered.filter(f => f.creatorId.username !== req.user.username);
      let favors = filterFavs.map((f)=> {return {...JSON.parse(JSON.stringify(f)), creationdate: `${f.createdAt.getDate()}/${f.createdAt.getMonth() + 1}/${f.createdAt.getFullYear()}`}});
      res.json({favors});
    })
    .catch(err => next(err))
});

router.get('/offerFavors', isLoggedIn, (req, res, next) => {
  User.findById(req.user._id, {...req.body.data, newUser: false})
    .then((user) => {
      const categories = user.offerCategories.length === 0 ? CATEGORIES_ENUM : user.offerCategories;
      Favor.find({
        type: "Need",
        $or: categories.map(c => {return {categories: c}})
        //creatorId: {$ne: req.user._id}
      })
      .populate('creatorId')
      .sort({ createdAt: -1 })
      //.skip(parseInt(req.query.offset || 0))
      //.limit(10)
      .then(favorsUnfiltered => {
        let filterFavs = favorsUnfiltered.filter(f => f.creatorId.username !== req.user.username);
        let favors = filterFavs.map((f)=> {return {...JSON.parse(JSON.stringify(f)), creationdate: `${f.createdAt.getDate()}/${f.createdAt.getMonth() + 1}/${f.createdAt.getFullYear()}`}});
        res.json({favors});
      })
    })
    .catch(err => next(err))
});

router.get('/nearbyFavors', isLoggedIn, (req, res, next) => {
  //console.log(req.body.data);
  User.findById(req.user._id)
    .then((user) => {
      Favor.find({
        location: {
          $near: {
            $geometry: {
              type: "Point" ,
              coordinates: [ user.location.coordinates[0] , user.location.coordinates[1] ]
            },
            $maxDistance: 50000
          }
        }
      })
      .populate('creatorId')
      .sort({ createdAt: -1 })
      //.skip(parseInt(req.query.offset || 0))
      //.limit(20)
      .then(favorsUnfiltered => {
        let filterFavs = favorsUnfiltered.filter(f => f.creatorId.username !== req.user.username);
        let favors = filterFavs.map((f)=> {return {...JSON.parse(JSON.stringify(f)), creationdate: `${f.createdAt.getDate()}/${f.createdAt.getMonth() + 1}/${f.createdAt.getFullYear()}`}});
        res.json({favors});
      })
    })
    .catch(err => next(err))
});

router.post("/:favorId/favorite", isLoggedIn, (req, res) => {
    let userId = req.user._id;
    let favorId = req.params.favorId;
    Favor.findById(favorId).then(favor => {
      if (favor.whoseFavId.indexOf(userId) !== -1) {
        favor.whoseFavId.pull(userId);
      } else {
        favor.whoseFavId.push(userId);
      }
      favor.save().then(fav=>{
        User.findById(userId).then(user => {
          if (user.favFavs.indexOf(favorId) !== -1) {
            user.favFavs.pull(favorId);
          } else {
            user.favFavs.push(favorId);
          }
          user.save().then(u=>{
            res.json(favor.whoseFavId);
          })
        });
      });
    });
  }
);


module.exports = router;
