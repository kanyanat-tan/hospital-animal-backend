const express = require('express');
const { getAllTreatmentBookingId, getAllTreatmentBooking, deleteTreatmentBooking, updateTreatmentBooking, createTreatmentBooking,getTreatmentBookingOwnership } = require('../controllers/treatmentInfoController');
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .post(verifyToken,verifyPermission(['user', 'admin', 'doctor']),createTreatmentBooking)
    .get(verifyToken,verifyPermission(['user', 'admin', 'doctor']),getAllTreatmentBooking)

router.route("/ownership")
    .get(verifyToken,verifyPermission(['user', 'admin', 'doctor']),getTreatmentBookingOwnership)

router.route("/:id")
    .get(verifyToken,checkID,verifyPermission(['user', 'admin', 'doctor']),getAllTreatmentBookingId)

router.route("/:animal_id/:booking_id/:treatmentbooking_id")
    .delete(verifyToken,verifyPermission(['admin']),deleteTreatmentBooking)
    .patch(verifyToken,verifyPermission(['user', 'admin', 'doctor']),updateTreatmentBooking)


module.exports = router;