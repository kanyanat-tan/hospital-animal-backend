const express = require('express');

const {getAllHospital,updateHospital,createHospital,deleteHospital,getHospitalById} = require('../controllers/hospitalController.js')
const {checkID} = require('../middleware/checkID.js')

const router = express.Router()

router.route("/")
                .get(getAllHospital)
                .post(createHospital)
router.route("/:id")
                .patch(checkID,updateHospital)
                .delete(checkID,deleteHospital)
                .get(checkID,getHospitalById)

module.exports = router;