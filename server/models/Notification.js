const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {NEW_FAVOR_RECEIVED, NEW_FAVOR_DONE, NEW_MESSAGE, NEW_BOON, NEW_FAVORITE} = require('../config/constants');

const notificationSchema = Schema({
  message: String,
  type: {type: String, enum: [NEW_FAVOR_RECEIVED, NEW_FAVOR_DONE, NEW_MESSAGE, NEW_BOON, NEW_FAVORITE]},
  receiverId: {type: Schema.Types.ObjectId, ref:'User'},
  seen: false
}, {timestamps: true}
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
