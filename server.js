const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoutes = require('./movieRoutes');
const bookingRoutes = require('./bookingRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB Connection
mongoose
  .connect('mongodb+srv://uday:uday2004@cluster0.qkzfdjd.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
