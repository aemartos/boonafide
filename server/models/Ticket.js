const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  // name: String,
  // description:  {type: String, default: 'There is no description yet'},
  // date: {type: Date, default: Date.now},
  //category: {type: String, enum: ["donations", "loans", "services", "repairs", "leisure", "care", "education", "feeding", "electronics", "animals", "home", "others"]},
  //picturesUrls: {type: Array, default: []},
  //location: {type: {type: String,default: 'Point'}, coordinates: [Number]},
  //creatorId: {type: Schema.Types.ObjectId, ref:'User'},
  date: Date,
  receiverId: {type: Schema.Types.ObjectId, ref:'User'},
  favorId: {type: Schema.Types.ObjectId, ref:'Favor'},
  reports: [{type: Schema.Types.ObjectId, ref:'User'}],
  validated: {type: Boolean, default: false}
}, {timestamps: true}
);

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
