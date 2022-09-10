const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketSchema = new Schema({
  // name: String,
  // description:  {type: String, default: 'There is no description yet'},
  // date: {type: Date, default: Date.now},
  // category: {type: String, enum: ["donations", "loans", "services", "repairs", "paperwork", "leisure", "care", "education", "feeding", "clothes", "shelter", "electronics", "animals", "home", "others"]},
  // picturesUrls: {type: Array, default: []},
  // location: {type: {type: String,default: 'Point'}, coordinates: [Number]},
  // creatorId: {type: Schema.Types.ObjectId, ref:'User'},
  date: { type: Date, default: Date.now() },
  donorId: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
  favorId: { type: Schema.Types.ObjectId, ref: 'Favor' },
  reports: { type: Schema.Types.ObjectId, ref: 'User' },
  validated: { type: Boolean, default: false },
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
