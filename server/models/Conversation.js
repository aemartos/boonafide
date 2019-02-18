const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = Schema({
  messages: [{ type: Schema.Types.ObjectId, ref:'Message' }],
  lastSmsId: { type: Schema.Types.ObjectId, ref:'Message' },
  roomName: String,
  authorId: {type: Schema.Types.ObjectId, ref:'User'},
  receiverId: {type: Schema.Types.ObjectId, ref:'User'}
}, {timestamps: true}
);

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
