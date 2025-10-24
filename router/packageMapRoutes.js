const express = require('express');
const { getAllPackageMap, getPackageMapById, createPackageMap, deletePackageMap } = require('../controllers/packageMapController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['user','doctor','admin']),getAllPackageMap)
    .post(verifyToken,verifyPermission(['admin']),createPackageMap)


router.route("/:id")
    .delete(verifyToken,checkID,verifyPermission(['admin']), deletePackageMap)
    .get(verifyToken,checkID,verifyPermission(['admin']), getPackageMapById)

module.exports = router;