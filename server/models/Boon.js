const mongoose = require('mongoose');

const { Schema } = mongoose;

const boonSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Boon = mongoose.model('Boon', boonSchema);
module.exports = Boon;
