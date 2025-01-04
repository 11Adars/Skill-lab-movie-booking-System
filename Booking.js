const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  customerName: { type: String, required: true },
  seatsBooked: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  priority: { type: Number, default: 0 },
});

module.exports = mongoose.model('Booking', BookingSchema);
