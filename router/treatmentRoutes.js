const express = require('express');
const { getAllTreatment, getTreatmentById, createTreatment, deleteTreatment, updateTreatment } = require('../controllers/treatmentController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,getAllTreatment)
    .post(verifyToken,verifyPermission(['user', 'admin', 'doctor']),createTreatment)

router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['user', 'admin', 'doctor']),updateTreatment)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deleteTreatment)
    .get(verifyToken,checkID,verifyPermission(['user', 'admin', 'doctor']),getTreatmentById)


module.exports = router;