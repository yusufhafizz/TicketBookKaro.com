const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieName: {
    type: String,
    required: [true, "Please enter movie name"],
  },
  movieImage: {
    type: String,
    required: [true, "Please enter movie Image path"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Rating is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  castMembers: {
    type: [String],
    required: [true, "Cast member names are required"],
  },
  castMembersImages: {
    type: [String],
    required: [true, "Cast member images are required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  bgImage: {
    type: String,
    required: [true, "bgImage is required"],
  },
});

module.exports = mongoose.model("movies", movieSchema);
