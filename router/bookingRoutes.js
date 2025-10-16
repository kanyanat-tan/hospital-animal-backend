const express = require('express');
const { getAllBooking, createBooking, updateBooking, deleteBooking, getBookingById } = require('../controllers/bookingController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllBooking)
    .post(createBooking)


router.route("/:id")
    .patch(checkID, updateBooking)
    .delete(checkID, deleteBooking)
    .get(checkID, getBookingById)

module.exports = router;