const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
// const Notification = require("../models/Notification");
const User = require('../models/User');

global.sockets = {};

const chat = (socket) => {
  socket.on('register', (obj) => {
    User.findById(obj.author).then((author) => {
      if (author.token === obj.token) {
        global.sockets[obj.author] = socket.id;
      }
    });
  });
  socket.on('sms_sent', (obj) => {
    const { authorId, receiverId, content } = obj;
    const roomName = authorId < receiverId ? `${authorId}_${receiverId}` : `${receiverId}_${authorId}`;
    const newSms = new Message({ content, authorId, receiverId });
    // save in the db
    newSms.save()
      .then(() => {
        // new conversation or add sms to existing conversation
        Conversation.find({ roomName })
          .then((res) => {
            let conversation = null;
            if (!res || res.length === 0) {
              conversation = new Conversation({
                messages: [newSms], authorId, receiverId, roomName, lastSmsId: newSms,
              });
            } else {
              [conversation] = res;
              conversation.messages = [...conversation.messages, newSms];
              conversation.lastSmsId = newSms;
            }
            conversation.save().then(() => {
              // eslint-disable-next-line no-unused-expressions
              global.sockets[authorId] && global.io.to(global.sockets[authorId]).emit('sms_received', {
                authorId, receiverId, content, createdAt: newSms.createdAt,
              });
              // eslint-disable-next-line no-unused-expressions
              global.sockets[receiverId] && global.io.to(global.sockets[receiverId]).emit('sms_received', {
                authorId, receiverId, content, createdAt: newSms.createdAt,
              });
              /* Notification.find({
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
                      .then(()=> {
                        global.io.to(global.sockets[receiverId]).emit('notification',{notification: not});
                      })
                  });
                }
              }) */
            });
          });
      }).catch(() => {});
  });
  socket.on('ping', () => global.io.to(socket.id).emit('pong'));
  socket.on('disconnect', () => { delete global.sockets[socket.id]; });
};

module.exports = { chat };
