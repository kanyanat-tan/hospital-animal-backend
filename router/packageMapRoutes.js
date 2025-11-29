const express = require('express');
const { getAllPackageMap, getPackageMapById, createPackageMap, getAllPackageBooking,createPackageBooking,deletePackageBooking, EditPackageBooking, getPackageBookingOwnership } = require('../controllers/packageMapController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['admin', 'doctor']),getAllPackageMap)
    .post(verifyToken,verifyPermission(['user', 'admin', 'doctor']),createPackageMap)

router.route("/packagebooking")
    .get(verifyToken,verifyPermission(['user', 'admin', 'doctor']),getAllPackageBooking)
    .post(verifyToken,verifyPermission(['user', 'admin', 'doctor']),createPackageBooking)

router.route("/ownership")
    .get(verifyToken,verifyPermission(['user', 'admin', 'doctor']),getPackageBookingOwnership)

router.route("/packagebooking/:bookingpackage_id/:booking_id/:packageid/:packagedetail_id")
    .delete(verifyToken,verifyPermission([ 'admin', 'doctor']),deletePackageBooking)
    .patch(verifyToken,verifyPermission([ 'admin', 'doctor']),EditPackageBooking)

router.route("/:id")
    .get(verifyToken,checkID,verifyPermission(['user','admin', 'doctor']),getPackageMapById)

module.exports = router;