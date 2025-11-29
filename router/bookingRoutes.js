const express = require('express');
const { getAllBooking, createBooking, updateBooking, deleteBooking, getBookingById } = require('../controllers/bookingController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['admin', 'doctor', 'user']),getAllBooking)
    .post(verifyToken,verifyPermission(['admin', 'doctor', 'user']),createBooking)


router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin', 'doctor', 'user']),updateBooking)
    .delete(verifyToken,checkID,verifyPermission(['admin', 'doctor', 'user']),deleteBooking)
    .get(verifyToken,checkID,verifyPermission(['admin', 'doctor', 'user']),getBookingById)

module.exports = router;