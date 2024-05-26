const mongoose = require("mongoose");

const bookingHistorySchema = mongoose.Schema({
  movieId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "movieId required"]
  },
  theatreId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "theaterId required"]
  },
  showtime: {
    type: String,
    required: [true, "Show Time required"]
  },
  showDate: {
    type: String,
    required: [true, "Show Date required"]
  },
  seats: {
    type: [String],
    required: [true, "Seats required"]
  }
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  name: {
    type: String,
    required: [true, "Name of user is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },
  dob: {
    type: String,
    required: [true, "dob is required"],
  },
  image: {
    type: String,
    required: false,
    default: ""
  },
  bookingHistory: {
    type: [bookingHistorySchema],
    required: false,
    default: []
  }
});

module.exports = mongoose.model("users", userSchema);
