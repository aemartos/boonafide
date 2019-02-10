const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { CATEGORIES_ENUM } = require('../config/constants');

const userSchema = new Schema({
  username: String,
  email: {type: String, default: null},
  password: String,
  caption: {type: String, default: "When someone does you a big favor, don't pay it back... PAY IT FORWARD!"},
  description: {type: String, default: "Edit your profile to change this"},
  location: {type: {type: String, default: 'Point'}, coordinates: [Number]},
  offerCategories: [{type: String, enum: CATEGORIES_ENUM}],
  needCategories: [{type: String, enum: CATEGORIES_ENUM}],
  facebookID: {type: String, default: null},
  googleID: {type: String, default: null},
  pictureUrl: {type: String, default: 'https://res.cloudinary.com/boonafide/image/upload/v1549110826/profile-pictures/profPicDefault02.png'},
  status: {type: String, enum: ['Pending Confirmation','Active'], default: 'Pending Confirmation'},
  confirmationCode: {type: String, unique: true},
  role: {type: String, enum: ['Bank', 'Admin', 'User'], default: 'User'},
  boons: [{ type: Schema.Types.ObjectId, ref:'Boon' }],
  favOffering: [{ type: Schema.Types.ObjectId, ref:'Favor' }],
  favWishing: [{ type: Schema.Types.ObjectId, ref:'Favor' }],
  currentHelped: [{type: Schema.Types.ObjectId, ref:'User'}],
  favDone: [{ type: Schema.Types.ObjectId, ref:'Favor' }],
  favReceived: [{ type: Schema.Types.ObjectId, ref:'Favor' }],
  newUser: {type: Boolean, default: true},
}, {timestamps: true}
);

userSchema.index({location: '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User;
