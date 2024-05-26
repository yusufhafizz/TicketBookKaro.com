const mongoose = require('mongoose');

const timeSchema = mongoose.Schema({
    time: {
        type: String,
        required: [true, "Time required"]
    },
    seatsBooked: {
        type: [String],
        required: false,
        default: []
    }
});

const movieTheatreSchema = mongoose.Schema({
    movieId: {
        type: mongoose.Schema.ObjectId,
        ref: "movies",
        required: [true, "MovieId is required"],
    },
    theatreId: {
        type: mongoose.Schema.ObjectId,
        ref: "theatre",
        required: [true, "TheatreId is required"],
    },
    showtime: {
        type: [timeSchema],
        required: [true, "Showtime required"]
    }
});

module.exports = mongoose.model("movietheatre", movieTheatreSchema);