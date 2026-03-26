const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  posterUrl: String,
  genre: String,
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  runtime: Number,
  description: String,
  cast: [
    {
      name: String,
      alias: String,
      profilePicture: String,
    },
  ],
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
