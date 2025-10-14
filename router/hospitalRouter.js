const express = require('express');

const {getAllHospital,updateHospital} = require('../controllers/hospitalController.js')
const {checkID} = require('../middleware/checkID.js')
const router = express.Router()

router.route("/").get(getAllHospital);
router.route("/:id").patch(checkID,updateHospital);
module.exports = router;