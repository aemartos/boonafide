const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Favor = require('../models/Favor');
const Ticket = require('../models/Ticket');
const Notification = require('../models/Notification');
const { isLoggedIn } = require('../middlewares/isLogged');


router.get('/allTickets', isLoggedIn, (req, res, next) => {
  Ticket.find({
    $or: [
      { donorId: req.user._id },
      { receiverId: req.user._id },
    ],
  })
    .populate('donorId')
    .populate('receiverId')
    .populate('favorId')
    .sort({ createdAt: -1 })
    // .skip(parseInt(req.query.offset || 0))
    // .limit(30)
    .then((tickets) => res.json({ tickets }))
    .catch((err) => next(err));
});

router.get('/:ticketId', isLoggedIn, (req, res, next) => {
  Ticket.findById(req.params.ticketId)
    .populate('donorId')
    .populate('receiverId')
    .populate('favorId')
    .then((ticket) => res.json(ticket))
    .catch((err) => next(err));
});

router.post('/:ticketId/validate', isLoggedIn, (req, res, next) => {
  const ticket = req.body.data;
  const donorId = ticket.donorId._id;
  const receiverId = ticket.receiverId._id;
  const favorId = ticket.favorId._id;
  if (receiverId.toString() === req.user._id.toString()) {
    Ticket.findByIdAndUpdate(req.params.ticketId, { validated: true })
      .then((ticketFound) => {
        User.findByIdAndUpdate(donorId, { $push: { currentHelped: receiverId, favDone: favorId } })
          .then((donor) => {
            User.findByIdAndUpdate(receiverId, { $push: { favReceived: favorId } })
              .then(() => {
                Notification.create({
                  type: 'ticketValidated',
                  receiverId: donor._id,
                  personId: req.user._id,
                  favorId,
                  helpedUsers: donor.currentHelped.length + 1,
                  ticketId: ticketFound._id,
                }).then((not) => {
                  User.findByIdAndUpdate(donorId, { $push: { notificationsId: not._id } }, { new: true }).then(() => {
                    res.json(ticketFound);
                    if (global.sockets[donor._id]) {
                      global.io.to(global.sockets[donor._id]).emit('notification', { notification: not });
                    }
                  });
                });
              });
          });
      })
      .catch((err) => next(err));
  }
});

router.post('/newTicket', isLoggedIn, (req, res) => {
  const ticket = req.body.data;
  if (ticket.donorId.toString() === req.user._id.toString() || ticket.receiverId.toString() === req.user._id.toString()) {
    const newTicket = new Ticket(ticket);
    newTicket.save()
      .then((tick) => {
        Favor.findById(tick.favorId)
          .then((favor) => {
            if (favor.remainingFavNum > 0) {
              // eslint-disable-next-line no-param-reassign
              favor.remainingFavNum--;
              favor.save().then(() => {
                User.findById(tick.receiverId).then((user) => {
                  if (!user || !user.boons || user.boons.length === 0) {
                    res.status(400).send('User has no boons available');
                    return;
                  }
                  
                  const boon = user.boons.pop();
                  user.save().then(() => {
                    User.findOne({ role: 'Bank' }, (err, ibo) => {
                      if (!ibo) {
                        res.status(500).send('Bank user not found.');
                        return;
                      }
                      
                      ibo.boons.push(boon._id);
                      ibo.save().then(() => {
                        Notification.create({
                          type: 'newTicket',
                          receiverId: ticket.receiverId,
                          personId: ticket.donorId,
                          favorId: favor._id,
                          ticketId: tick._id,
                        }).then((not1) => {
                          if (global.sockets[ticket.receiverId]) {
                            global.io.to(global.sockets[ticket.receiverId]).emit('notification', { notification: not1 });
                          }
                          User.findByIdAndUpdate(ticket.receiverId, { $push: { notificationsId: not1._id } }, { new: true }).then(() => {
                            Notification.create({
                              type: 'newTicket',
                              receiverId: ticket.donorId,
                              personId: ticket.receiverId,
                              favorId: favor._id,
                              ticketId: tick._id,
                            }).then((not2) => {
                              User.findByIdAndUpdate(ticket.donorId, { $push: { notificationsId: not2._id } }, { new: true })
                                .then(() => {
                                  if (global.sockets[ticket.donorId]) {
                                    global.io.to(global.sockets[ticket.donorId]).emit('notification', { notification: not2 });
                                  }
                                  res.json(tick);
                                });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            }
          });
      })
      .catch(() => res.status(500).send('Something went wrong'));
  }
});


module.exports = router;
