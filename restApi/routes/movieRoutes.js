const express = require("express");
const router = express.Router();
const movieController = require("../controller/movieController");

router.route("/").get(movieController.getMovies);

module.exports = router;
