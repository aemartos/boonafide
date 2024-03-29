const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = Schema({
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  favId: { type: Schema.Types.ObjectId, ref: 'Favor' },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
