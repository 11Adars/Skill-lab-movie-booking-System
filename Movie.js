const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: Number,
  releaseDate: Date,
  ticketsAvailable: { type: Number, default: 100 },
});

module.exports = mongoose.model('Movie', MovieSchema);
