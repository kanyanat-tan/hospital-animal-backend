const express = require('express');
const { getAllPackageDetail, getPackageDetailById, createPackageDetail, deletePackageDetail, updatePackageDetail } = require('../controllers/packageDetailController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['user','doctor','admin']),getAllPackageDetail)
    .post(verifyToken,verifyPermission(['admin']),createPackageDetail)


router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin']), updatePackageDetail)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deletePackageDetail)
    .get(verifyToken,checkID,verifyPermission(['admin']),getPackageDetailById)

module.exports = router;