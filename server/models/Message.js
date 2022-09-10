const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = Schema({
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
