const express = require('express');
const { getAllPackageDetail, getPackageDetailById, createPackageDetail, deletePackageDetail, updatePackageDetail } = require('../controllers/packageDetailController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllPackageDetail)
    .post(createPackageDetail)


router.route("/:id")
    .patch(checkID, updatePackageDetail)
    .delete(checkID, deletePackageDetail)
    .get(checkID, getPackageDetailById)

module.exports = router;