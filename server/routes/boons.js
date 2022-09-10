const express = require('express');

const router = express.Router();
const Boon = require('../models/Boon');
const User = require('../models/User');

const { isLoggedIn } = require('../middlewares/isLogged');

router.get('/totalBoons', isLoggedIn, (req, res, next) => {
  Boon.find()
    .then((boons) => res.json(boons))
    .catch((err) => next(err));
});

router.post('/redeemBoon', isLoggedIn, (req, res, next) => {
  const userId = req.user._id;
  Boon.create({}).then((boon) => {
    // User.findByIdAndUpdate(userId, {
    //   $push: {boons: boon._id},
    //   $set: {currentHelped: []}
    // })
    User.findById(userId).then((user) => {
      user.boons.push(boon._id);
      user.currentHelped.splice(0, 3);
      user.save().then(() => res.json(user));
    })
      .catch((err) => next(err));
  });
});

module.exports = router;
