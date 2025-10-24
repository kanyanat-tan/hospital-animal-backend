const express = require('express');
const {getAllAnimal,createAnimal,getAnimalById,deleteAnimal,updateAnimal} = require('../controllers/animalController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')
const {checkAnimalOwnership} =require('../middleware/checkPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['admin','doctor']),getAllAnimal)
    .post(verifyToken,verifyPermission(['user','admin','doctor']),createAnimal)


router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin','doctor']), updateAnimal)
    .delete(verifyToken,checkID,verifyPermission(['admin',]),deleteAnimal)
    .get(verifyToken,checkID,verifyPermission(['user','admin','doctor']),checkAnimalOwnership,getAnimalById)

module.exports = router;