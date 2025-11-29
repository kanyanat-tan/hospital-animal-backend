const express = require('express');
const { getPackageDetailByPackage, getPackageDetailByPackageName, packageDetailCreate, getPackageDetailId,updatePackageDetailInfo } = require('../controllers/packageDetailInfoController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .post(verifyToken,verifyPermission(['admin']),packageDetailCreate)
    .get(getPackageDetailByPackage)

router.route("/:id")
    .get(getPackageDetailId)
    .patch(verifyToken,checkID,verifyPermission(['admin']),updatePackageDetailInfo)

router.route("/by-name/:name")
    .get(getPackageDetailByPackageName)




module.exports = router;