const express = require('express');
const { getAllTreatmentBooking, getTreatmentById, createTreatmentBooking, deleteTreatment, updateTreatment } = require('../controllers/treatmentController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')
const {checkTreatmentOwnership} = require('../middleware/checkPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['admin','doctor']),getAllTreatmentBooking)
    .post(verifyToken,verifyPermission(['user','admin','doctor']),createTreatmentBooking)


router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['user','admin','doctor']),updateTreatment)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deleteTreatment)
    .get(verifyToken,checkID,verifyPermission(['user','admin','doctor']),checkTreatmentOwnership, getTreatmentById)

module.exports = router;