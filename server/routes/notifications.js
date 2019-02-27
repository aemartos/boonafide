const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Notification = require("../models/Notification");
const { isLoggedIn } = require('../middlewares/isLogged');

router.get('/', isLoggedIn, (req, res, next) => {
  Notification.find({"receiverId": req.user._id})
    .populate("receiverId")
    .populate("favorId")
    .populate("ticketId")
    .populate("personId")
    .sort({ createdAt: -1 })
    //.skip(parseInt(req.query.offset || 0))
    //.limit(30)
    .then(notifications => res.json(notifications))
    .catch(err => next(err))
});

router.post('/:notificationId/seen', isLoggedIn, (req, res, next) => {
  Notification.findByIdAndUpdate(req.params.notificationId, {seen: true})
    .then(not => res.json(not))
    .catch(err => next(err))
});

module.exports = router;
