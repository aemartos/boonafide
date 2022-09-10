const express = require('express');

const router = express.Router();
const { isLoggedIn } = require('../middlewares/isLogged');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
// const Notification = require("../models/Notification");
const User = require('../models/User');


router.get('/conversations', isLoggedIn, (req, res, next) => {
  const authorId = req.user._id.toString();
  Conversation.find({
    $or: [
      { authorId },
      { receiverId: authorId },
    ],
  })
    .populate('authorId')
    .populate('receiverId')
    .populate('lastSmsId')
    .sort({ updatedAt: -1 })
  // .skip(req.params.offset || 0)
  // .limit(30)
    .then((conversations) => res.json(conversations))
    .catch((err) => next(err));
});

const getPreviousMessages = (req, res) => {
  // retrieve previous messages
  const authorId = req.user._id.toString();
  const { receiverId } = req.params;
  User.findById(receiverId).then((receiver) => {
    Message.find({
      $or: [
        { authorId, receiverId },
        { authorId: receiverId, receiverId: authorId },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(parseInt(req.query.offset || 0, 10))
      .limit(30)
      .then((messages) => res.json({ receiver, messages: messages.reverse() }))
      .catch(() => { /* console.error(err) */ });
  });
};

// this route is called when a user enters a conversation
router.get('/:receiverId', isLoggedIn, getPreviousMessages);

router.get('/getAllMessagesFrom/:receiverId', isLoggedIn, getPreviousMessages);


module.exports = router;
