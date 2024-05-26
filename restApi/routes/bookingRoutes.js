const express = require("express");
const router = express.Router();
const bookingHistoryController = require("../controller/bookingHistoryController");

router
  .route("/")
  .get(bookingHistoryController.getHistory)
  .post(bookingHistoryController.newBooking);

module.exports = router;
