const express = require('express');
const {getAllPackage, getPackageById, createPackage, deletePackage, updatePackage } = require('../controllers/packageController')
const { checkID, checkGetID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(getAllPackage)
    .post(verifyToken,checkID,verifyPermission(['admin']),createPackage)

router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin']),updatePackage)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deletePackage)
    .get(checkGetID,getPackageById)



module.exports = router;