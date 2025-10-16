const express = require('express');
const { getAllTreatmentBooking, getTreatmentById, createTreatmentBooking, deleteTreatment, updateTreatment } = require('../controllers/treatmentController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllTreatmentBooking)
    .post(createTreatmentBooking)


router.route("/:id")
    .patch(checkID, updateTreatment)
    .delete(checkID, deleteTreatment)
    .get(checkID, getTreatmentById)

module.exports = router;