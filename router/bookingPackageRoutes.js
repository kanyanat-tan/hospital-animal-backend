const express = require('express');
const { getAllBookingPackage,createBookingPackage,getBookingPackageById,updateBookingPackage,deleteBookingPackage } = require('../controllers/bookingPackageController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllBookingPackage)
    .post(createBookingPackage)


router.route("/:id")
    .delete(checkID, deleteBookingPackage)
    .get(checkID, getBookingPackageById)
    .patch(checkID,updateBookingPackage)

module.exports = router;