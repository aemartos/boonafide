const express = require("express");
const router = express.Router();
const Boon = require("../models/Boon");

const {isLoggedIn} = require('../middlewares/isLogged');

router.get('/totalBoons', isLoggedIn, (req, res, next) => {
  Boon.find()
    .then(boons => res.json(boons))
    .catch(err => next(err))
});

module.exports = router;
