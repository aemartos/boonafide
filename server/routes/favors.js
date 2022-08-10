const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Favor = require("../models/Favor");
const Review = require("../models/Review");
const Notification = require("../models/Notification");
const { uploadFavorPictures } = require('../config/cloudinary.js');
const { isLoggedIn } = require('../middlewares/isLogged');
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
      let filterFavs = favorsUnfiltered.filter(f => f.creatorId.username !== req.user.username && f.remainingFavNum > 0);
      let favors = filterFavs.map((f)=> {return {...JSON.parse(JSON.stringify(f)), creationdate: `${f.createdAt.getDate()}/${f.createdAt.getMonth() + 1}/${f.createdAt.getFullYear()}`};});
      res.json({favors});
    })
    .catch(err => next(err));
});

router.get('/offerFavors', isLoggedIn, (req, res, next) => {
  User.findById(req.user._id, {...req.body.data, newUser: false})
    .then((user) => {
      const categories = user.offerCategories.length === 0 ? CATEGORIES_ENUM : user.offerCategories;
      Favor.find({
        type: "Need",
        $or: categories.map(c => {return {categories: c};})
        //creatorId: {$ne: req.user._id}
      })
      .populate('creatorId')
      .sort({ createdAt: -1 })
      //.skip(parseInt(req.query.offset || 0))
      //.limit(10)
      .then(favorsUnfiltered => {
        let filterFavs = favorsUnfiltered.filter(f => f.creatorId.username !== req.user.username && f.remainingFavNum > 0);
        let favors = filterFavs.map((f)=> {return {...JSON.parse(JSON.stringify(f)), creationdate: `${f.createdAt.getDate()}/${f.createdAt.getMonth() + 1}/${f.createdAt.getFullYear()}`};});
        res.json({favors});
      });
    })
    .catch(err => next(err));
});

router.get('/nearbyFavors', isLoggedIn, (req, res, next) => {
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
        let filterFavs = favorsUnfiltered.filter(f => f.creatorId.username !== req.user.username && f.remainingFavNum > 0);
        let favors = filterFavs.map((f) => {return {...JSON.parse(JSON.stringify(f)), creationdate: `${f.createdAt.getDate()}/${f.createdAt.getMonth() + 1}/${f.createdAt.getFullYear()}`};});
        res.json({favors});
      });
    })
    .catch(err => next(err));
});

router.get('/:favorId', isLoggedIn, (req, res, next) => {
  Favor.findById(req.params.favorId)
    .populate('creatorId')
    .populate({ path: "reviewsId", populate: { path: "authorId" } })
      .then(favor => res.json(favor))
      .catch(err => next(err));
});

router.post('/:favorId/addComment', isLoggedIn, (req, res) => {
  const review = req.body.data;
  const authorId = req.user._id;
  Review.create({...review, authorId}).then(rev => {
    //console.log(rev);
    Favor.findByIdAndUpdate(req.params.favorId, {$push: {reviewsId: rev._id}}, {new: true})
      .populate({ path: "reviewsId", populate: { path: "authorId" } })
      .then(favor => {
        Notification.create({
          type: "commentInFavor",
          receiverId: favor.creatorId,
          personId: req.user._id,
          favorId: favor._id,
        })
        .then((not) => {
          User.findByIdAndUpdate(favor.creatorId, {$push: {notificationsId: not._id}}, {new: true}).then(() => {
            if (global.sockets[favor.creatorId]){
              //console.log(not)
              global.io.to(global.sockets[favor.creatorId]).emit('notification',{notification: not});
            }
            res.json(favor);
          });
        });
      })
      .catch(() => res.status(500).send("Something went wrong"));
    });
  });

router.post("/:favorId/favorite", isLoggedIn, (req, res) => {
    let userId = req.user._id;
    let favorId = req.params.favorId;
    Favor.findById(favorId).then(favor => {
      if (favor.whoseFavId.indexOf(userId) !== -1) {
        favor.whoseFavId.pull(userId);
      } else {
        favor.whoseFavId.push(userId);
        Notification.create({
          type: "favoriteFavor",
          receiverId: favor.creatorId,
          personId: req.user._id,
          favorId: favor._id,
        }).then((not) => {
          User.findByIdAndUpdate(favor.creatorId, {$push: {notificationsId: not._id}}, {new: true}).then(() => {
            if (global.sockets[favor.creatorId]){
              global.io.to(global.sockets[favor.creatorId]).emit('notification',{notification: not});
            }
          });
        });
      }
      favor.save().then(() => {
        User.findById(userId).then(user => {
          if (user.favFavs.indexOf(favorId) !== -1) {
            user.favFavs.pull(favorId);
          } else {
            user.favFavs.push(favorId);
          }
          user.save().then(() => {
            res.json(favor.whoseFavId);
          });
        });
      });
    });
  }
);

router.post('/pictures', isLoggedIn, uploadFavorPictures.array("picture", 3), (req, res) => {
  const pictureUrls = [];
  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      pictureUrls.push(req.files[i].path);
    }
  }
  res.json(pictureUrls);
});

router.post('/newFavor', isLoggedIn, (req, res) => {
  const creatorId = req.user._id;
  const favor = {...req.body.favor, creatorId};
  const newFavor = new Favor(favor);
  const favorType = favor.type === "Offer" ? "favOffer" : "favNeed";
  newFavor.save()
    .then(fav => {
      User.findByIdAndUpdate(creatorId, {$push: {[favorType]: fav._id}})
      .then(() => {})
        .then(() => res.json(fav)) ;
    })
      .catch(() => res.status(500).send("Something went wrong"));
});


module.exports = router;
