const express = require('express');
const Movie = require('./Movie');
const fs = require('fs');
const router = express.Router();

// Create a new movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();

    // Format the new movie data
    const movieData = `
Title: ${savedMovie.title}
Description: ${savedMovie.description || 'N/A'}
Duration: ${savedMovie.duration || 'N/A'} minutes
Release Date: ${savedMovie.releaseDate?.toDateString() || 'N/A'}
Tickets Available: ${savedMovie.ticketsAvailable}

`;

    // Append the new movie data to movies.txt
    fs.appendFile('./movies.txt', movieData, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Write all movies to a text file
router.get('/export', async (req, res) => {
  try {
    const movies = await Movie.find();

    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies available to export' });
    }

    let movieData = 'Movies List:\n\n';
    movies.forEach((movie, index) => {
      movieData += `${index + 1}. Title: ${movie.title}\n`;
      movieData += `   Description: ${movie.description || 'N/A'}\n`;
      movieData += `   Duration: ${movie.duration || 'N/A'} minutes\n`;
      movieData += `   Release Date: ${movie.releaseDate?.toDateString() || 'N/A'}\n`;
      movieData += `   Tickets Available: ${movie.ticketsAvailable}\n\n`;
    });

    const filePath = './movies.txt';
    fs.writeFile(filePath, movieData, (err) => {
      if (err) {
        throw new Error('Error writing to file');
      }
      res.status(200).json({ message: `Movies exported to ${filePath}` });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
