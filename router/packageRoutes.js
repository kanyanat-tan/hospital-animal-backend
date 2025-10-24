const express = require('express');
const { getAllPackage, getPackageById, createPackage, deletePackage, updatePackage } = require('../controllers/packageController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['user','doctor','admin']),getAllPackage)
    .post(verifyToken,verifyPermission(['admin']),createPackage)


router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin']),updatePackage)
    .delete(verifyToken,checkID,verifyPermission(['admin']), deletePackage)
    .get(verifyToken,checkID,verifyPermission(['admin']), getPackageById)

module.exports = router;