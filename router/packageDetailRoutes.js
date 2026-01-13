const express = require('express');
const { getAllPackageDetail, getPackageDetailById, createPackageDetail, deletePackageDetail } = require('../controllers/packageDetailController')
const { checkID, checkGetID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(getAllPackageDetail)
    .post(verifyToken,verifyPermission(['admin']),createPackageDetail)


router.route("/:id")
    .delete(verifyToken,checkID,verifyPermission(['admin']),deletePackageDetail)
    .get(checkGetID,getPackageDetailById)

module.exports = router;