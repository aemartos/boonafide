const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const {isLoggedIn} = require('../middlewares/isLogged');



router.get('/allTickets', isLoggedIn, (req, res, next) => {
  Ticket.find({$or: [
      {"donorId": req.user._id},
      {"receiverId": req.user._id},
    ]})
    .populate('donorId')
    .populate('receiverId')
    .populate('favorId')
    .sort({ createdAt: -1 })
    //.skip(parseInt(req.query.offset || 0))
    //.limit(30)
    .then(tickets => res.json({tickets}))
    .catch(err => next(err))
});

router.get('/:ticketId', isLoggedIn, (req, res, next) => {
  Ticket.findById(req.params.ticketId)
    .populate('donorId')
    .populate('receiverId')
    .populate('favorId')
    .then(ticket => res.json(ticket))
    .catch(err => next(err))
});


module.exports = router;
