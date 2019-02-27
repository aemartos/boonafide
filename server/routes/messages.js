const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLogged');
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const Notification = require("../models/Notification");
const User = require("../models/User");


router.get('/conversations', isLoggedIn, (req, res, next) => {
  let authorId = req.user._id.toString();
  Conversation.find({$or: [
    {"authorId": authorId},
    {"receiverId": authorId},
  ]})
  .populate('authorId')
  .populate('receiverId')
  .populate('lastSmsId')
  .sort({ createdAt: 1 })
  //.skip(req.params.offset || 0)
  //.limit(30)
  .then(conversations => res.json(conversations))
  .catch(err => next(err))

});

const getPreviousMessages = (req, res) => {
  //retrieve previous messages
  let authorId = req.user._id.toString();
  let receiverId = req.params.receiverId;
  User.findById(receiverId).then(receiver => {
    Message.find({$or: [
        {"authorId": authorId, "receiverId": receiverId},
        {"authorId": receiverId, "receiverId": authorId},
      ]})
      .sort({ createdAt: -1 })
      .skip(parseInt(req.query.offset || 0))
      .limit(30)
      .then(messages => res.json({receiver, messages:messages.reverse()}))
      .catch(err => {
        //console.error(err)
      })
    });
}

//object with key: all rooms with users connected IDs (in alphabetic order); value: array with the users Id connected at that room
let sockets = {};
//this route is called when a user enters a conversation
router.get('/:receiverId', isLoggedIn, (req, res, next) => {
  let authorId = req.user._id.toString();
  let receiverId = req.params.receiverId;
  let roomName = authorId < receiverId ? authorId + '_' + receiverId : receiverId + '_' + authorId;
  //create a socket connection for that user in that room if it doesn't exits already
  if (!sockets[roomName] || sockets[roomName].indexOf(authorId) === -1 ) {
    global.io.on('connection', function(socket){
      sockets[roomName] = [...(sockets[roomName] || []), authorId];
      socket.on('subscribe', sub => {
        if(sub.room === roomName) socket.join(sub.room);
      }); //user subscribes to room
      //receive message from client
      socket.on('sms_sent', obj => {
        let {authorIdMsg, receiverIdMsg, content, room} = obj;
        if (authorId === authorIdMsg && receiverId === receiverIdMsg) {
          const newSms = new Message({ content, authorId, receiverId });
          //save in the db
          newSms.save()
            .then(sms => {
              //console.log('NEW MESSAGE //// from :', authorId, "(",req.user.username, ")  to: ",receiverId, "; saying: ", content);
              //if it saves correctly notifies everyone in the room
              io.in(room).emit('sms_received', {authorId, receiverId, content, createdAt: newSms.createdAt});
              //new conversation or add sms to existing conversation
              Conversation.find({roomName})
                .then(res => {
                  let conversation = null;
                  if (!res || res.length === 0) {
                    conversation = new Conversation({ messages: [newSms], authorId, receiverId, roomName, lastSmsId: newSms });
                  } else {
                    conversation = res[0];
                    conversation.messages = [...conversation.messages, newSms];
                    conversation.lastSmsId = newSms;
                  }
                  conversation.save().then(e=>{
                    //console.log(e)
                    Notification.find({
                      "type": "newMessage",
                      "receiverId": receiverId,
                      "personId": authorId,
                      "seen": false
                    }).then(nots => {
                      if (!nots || nots.length === 0) {
                        Notification.create({
                          type: "newMessage",
                          receiverId,
                          personId: authorId
                        }).then(not => {
                          User.findByIdAndUpdate(receiverId, {$push: {notificationsId: not._id}}, {new: true})
                            .then(()=> {})
                        });
                      }
                    })
                  });
                }).catch(err => {
                  //console.log(err)
                });
            })
            // .catch(err => {
            //   res.status(500).send("Something went wrong");
            // });
        }
      })
    });
  }
  next();
},  getPreviousMessages);

router.get('/getAllMessagesFrom/:receiverId', isLoggedIn, getPreviousMessages);

router.post('/disconnect', isLoggedIn, (req,res,next) => {
  let authorId = req.user._id.toString();
  let receiverId = req.params.receiverId;
  let roomName = authorId < receiverId ? authorId + '_' + receiverId : receiverId + '_' + authorId;
  if (sockets[roomName]){
    let index = sockets[roomName].indexOf(authorId);
    if (index > -1) {
      sockets[roomName].splice(index,1);
    }
    if (sockets[roomName].length === 0) {
      sockets[roomName] = undefined;
    }
  }
});


module.exports = router;
