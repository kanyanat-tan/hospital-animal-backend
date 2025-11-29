const express = require('express');
const { getAllAnimal, createAnimal, getAnimalById, deleteAnimal, updateAnimal } = require('../controllers/animalController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')
const { checkAnimalOwnership } = require('../middleware/checkPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken, verifyPermission(['admin', 'doctor']), getAllAnimal)
    .post(verifyToken, verifyPermission(['user', 'admin', 'doctor']), createAnimal);

router.route("/ownership")
    .get(verifyToken, verifyPermission(['user', 'admin', 'doctor']), getAnimalById)

router.route("/:id")
    .patch(verifyToken, checkID, verifyPermission(['user', 'admin', 'doctor']), updateAnimal)
    .delete(verifyToken, checkID, verifyPermission(['user', 'admin', 'doctor']), deleteAnimal)


module.exports = router;