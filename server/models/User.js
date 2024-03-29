const mongoose = require('mongoose');

const { Schema } = mongoose;
const { CATEGORIES_ENUM } = require('../config/constants');

const userSchema = new Schema({
  username: String,
  email: { type: String, default: null },
  password: String,
  caption: { type: String, default: "When someone does you a big favor, don't pay it back... PAY IT FORWARD!" },
  description: { type: String, default: 'Edit your profile to change this' },
  location: { type: { type: String, default: 'Point' }, coordinates: { type: [Number], default: [0.000000, 0.000000] } },
  locationName: { type: String, default: 'Unknown' },
  offerCategories: [{ type: String, enum: CATEGORIES_ENUM }],
  needCategories: [{ type: String, enum: CATEGORIES_ENUM }],
  pictureUrl: { type: String, default: 'https://res.cloudinary.com/boonafide/image/upload/v1549110826/profile-pictures/profPicDefault02.png' },
  status: { type: String, enum: ['Pending Confirmation', 'Active'], default: 'Pending Confirmation' },
  role: { type: String, enum: ['Bank', 'Admin', 'User'], default: 'User' },
  boons: [{ type: Schema.Types.ObjectId, ref: 'Boon' }],
  favOffer: [{ type: Schema.Types.ObjectId, ref: 'Favor' }],
  favNeed: [{ type: Schema.Types.ObjectId, ref: 'Favor' }],
  currentHelped: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  favDone: [{ type: Schema.Types.ObjectId, ref: 'Favor' }],
  favReceived: [{ type: Schema.Types.ObjectId, ref: 'Favor' }],
  notificationsId: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  favFavs: [{ type: Schema.Types.ObjectId, ref: 'Favor' }],
  newUser: { type: Boolean, default: true },
  token: { type: String, unique: true },
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User;
