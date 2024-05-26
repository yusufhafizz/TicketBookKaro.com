const movies = require("../models/movieSchema");

exports.getMovies = async (req, res) => {
  const allmoviess = await movies.find();
  res.status(200).json(allmoviess);
};
