const express = require('express');

const {getAllHospital,updateHospital,createHospital,deleteHospital,getHospitalById} = require('../controllers/hospitalController.js')
const {checkID} = require('../middleware/checkID.js')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
                .get(verifyToken,verifyPermission(['admin','user','doctor']),getAllHospital)
                .post(verifyToken,verifyPermission(['admin']),createHospital)
router.route("/:id")
                .patch(verifyToken,checkID,verifyPermission(['admin']),updateHospital)
                .delete(verifyToken,checkID,verifyPermission(['admin']),deleteHospital)
                .get(verifyToken,checkID,verifyPermission(['admin','user','doctor']),getHospitalById)

module.exports = router;