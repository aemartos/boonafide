const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favorSchema = new Schema({
  name: String,
  description:  {type: String, default: 'There is no description yet'},
  creatorId: {type: Schema.Types.ObjectId, ref:'User'},
  remainingFavNum: Number,
  date: [{type: Date, default: Date.now}],
  category: [{type: String, enum: ["", ""]}],
  picturesUrls: {type: Array, default: []},
  reviewsId: [{type: Schema.Types.ObjectId, ref:'Review'}],
  whoseFavId: [{type: Schema.Types.ObjectId, ref:'User'}],
  whoNeedsId: [{type: Schema.Types.ObjectId, ref:'User'}],
  doneTo: [{type: Schema.Types.ObjectId, ref:'User'}],
  location: {type: {type: String,default: 'Point'}, coordinates: [Number]}
}, {timestamps: true}
);

const Favor = mongoose.model('Favor', favorSchema);
module.exports = Favor;
