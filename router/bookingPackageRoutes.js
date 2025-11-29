const express = require('express');
const { getAllBookingPackage, createBookingPackage, getBookingPackageById, updateBookingPackage, deleteBookingPackage } = require('../controllers/bookingPackageController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')
const { checkBookingPackageOwnership } = require('../middleware/checkPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken, verifyPermission(['admin', 'doctor', 'user']), getAllBookingPackage)
    .post(verifyToken, verifyPermission(['admin', 'doctor', 'user']), createBookingPackage)


router.route("/:id")
    .delete(verifyToken, checkID, verifyPermission(['admin']), deleteBookingPackage)
    .get(verifyToken, checkID, verifyPermission(['admin', 'doctor', 'user']), checkBookingPackageOwnership, getBookingPackageById)
    .patch(verifyToken, checkID, verifyPermission(['admin', 'doctor', 'user']), checkBookingPackageOwnership, updateBookingPackage)

module.exports = router;