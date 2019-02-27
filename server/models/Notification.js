const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { NOTIFICATIONS_ENUM } = require('../config/constants');

const notificationSchema = Schema({
  type: {type: String, enum: Object.keys(NOTIFICATIONS_ENUM)},
  receiverId: {type: Schema.Types.ObjectId, ref:'User'},
  personId: {type: Schema.Types.ObjectId, ref:'User'},
  favorId: {type: Schema.Types.ObjectId, ref:'Favor'},
  ticketId: {type: Schema.Types.ObjectId, ref:'Ticket'},
  helpedUsers: Number,
  seen: {type: Boolean, default: false}
}, {timestamps: true}
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
