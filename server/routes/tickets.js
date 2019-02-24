const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Favor = require("../models/Favor");
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


router.post('/newTicket', isLoggedIn, (req, res, next) => {
  const ticket = req.body.data;
  if (ticket.donorId.toString() === req.user._id.toString() || ticket.receiverId.toString() === req.user._id.toString() ) {
    const newTicket = new Ticket(ticket);
    console.log(ticket);
      newTicket.save()
        .then(tick => {
          Favor.findById(tick.favorId)
            .then(favor => {
              if (favor.remainingFavNum > 0) {
                favor.remainingFavNum--;
                favor.save().then(()=> {
                  User.findById(tick.receiverId).then(user => {
                    const boon = user.boons.pop();
                    user.save().then(()=> {
                      User.findOne({role: "Bank"}, (err, ibo) => {
                        ibo.boons.push(boon._id);
                        ibo.save().then(()=> res.json(tick));
                      })
                    });
                  })
                });
              }
            })
        })
        .catch(err => res.status(500).send("Something went wrong"))
  }
});


module.exports = router;
