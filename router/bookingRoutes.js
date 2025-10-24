const express = require('express');
const { getAllBooking, createBooking, updateBooking, deleteBooking, getBookingById } = require('../controllers/bookingController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')
const {checkBookingOwnership} = require('../middleware/checkPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['admin','doctor']),getAllBooking)
    .post(verifyToken,verifyPermission(['user','admin','doctor']),createBooking)


router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['user','admin','doctor']),checkBookingOwnership, updateBooking)
    .delete(verifyToken,checkID,verifyPermission(['admin']), deleteBooking)
    .get(verifyToken,checkID,verifyPermission(['user','admin','doctor']),checkBookingOwnership, getBookingById)

module.exports = router;