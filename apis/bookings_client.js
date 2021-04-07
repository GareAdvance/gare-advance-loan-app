const express = require("express");

const { createBookingsLoan } = require("../controller/bookings_client");
const { bookingsValidator } = require("../validation/bookings_validation");

const router = express.Router();

router.post("/gare_bookings/loan", bookingsValidator, createBookingsLoan);

module.exports = router;