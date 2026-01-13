const express = require('express');

const {getAllHospital,updateHospital,createHospital,deleteHospital,getHospitalById} = require('../controllers/hospitalController.js')
const {checkID, checkGetID} = require('../middleware/checkID.js')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
                .get(getAllHospital)
                .post(verifyToken,verifyPermission(['admin']),createHospital)
router.route("/:id")
                .patch(verifyToken,checkID,verifyPermission(['admin']),updateHospital)
                .delete(verifyToken,checkID,verifyPermission(['admin']),deleteHospital)
                .get(checkGetID,getHospitalById)

module.exports = router;