const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { CATEGORIES_ENUM } = require('../config/constants');

const favorSchema = new Schema({
  name: String,
  description:  {type: String, default: 'There is no description yet'},
  creatorId: {type: Schema.Types.ObjectId, ref:'User'},
  remainingFavNum: Number,
  shifts: Object,
  type: {type: String, enum: ["Offer", "Need"]},
  categories: [{type: String, enum: CATEGORIES_ENUM}],
  pictureUrls: {type: Array, default: []},
  reviewsId: [{type: Schema.Types.ObjectId, ref:'Review'}],
  whoseFavId: [{type: Schema.Types.ObjectId, ref:'User'}],
  whoNeedsId: [{type: Schema.Types.ObjectId, ref:'User'}],
  tickets: [{type: Schema.Types.ObjectId, ref:'Ticket'}],
  reports: [{type: Schema.Types.ObjectId, ref:'User'}],
  location: {type: {type: String, default: 'Point'}, coordinates: [Number]},
  locationName: String
}, {timestamps: true}
);

favorSchema.index({location: '2dsphere' });

const Favor = mongoose.model('Favor', favorSchema);
module.exports = Favor;
