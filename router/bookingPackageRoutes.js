const express = require('express');
const { getAllBookingPackage,createBookingPackage,getBookingPackageById,updateBookingPackage,deleteBookingPackage } = require('../controllers/bookingPackageController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')
const {checkBookingPackageOwnership} = require('../middleware/checkPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['admin','doctor']),getAllBookingPackage)
    .post(verifyToken,verifyPermission(['user','admin','doctor']),createBookingPackage)


router.route("/:id")
    .delete(verifyToken,checkID,verifyPermission(['admin','doctor']), deleteBookingPackage)
    .get(verifyToken,checkID,verifyPermission(['user','admin','doctor']),checkBookingPackageOwnership,getBookingPackageById)
    .patch(verifyToken,checkID,verifyPermission(['user','admin','doctor']),checkBookingPackageOwnership,updateBookingPackage)

module.exports = router;