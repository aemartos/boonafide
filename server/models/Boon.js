const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boonSchema = new Schema({
  quantity: Number,
  ownerId: {type: Schema.Types.ObjectId, ref:'User'},
}, {timestamps: true}
);

const Boon = mongoose.model('Boon', boonSchema);
module.exports = Boon;
