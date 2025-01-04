const express = require('express');
const Booking = require('./Booking');

const Movie = require('./Movie');
const PriorityQueue = require('./PriorityQueue');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { movieId, customerName, seatsBooked } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie || movie.ticketsAvailable < seatsBooked) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const booking = new Booking({ movieId, customerName, seatsBooked });
    const savedBooking = await booking.save();

    // Update available tickets
    movie.ticketsAvailable -= seatsBooked;
    await movie.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('movieId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
