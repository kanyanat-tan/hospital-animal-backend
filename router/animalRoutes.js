const express = require('express');
const {getAllAnimal,createAnimal,getAnimalById,deleteAnimal,updateAnimal} = require('../controllers/animalController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllAnimal)
    .post(createAnimal)


router.route("/:id")
    .patch(checkID, updateAnimal)
    .delete(checkID,deleteAnimal)
    .get(checkID,getAnimalById)

module.exports = router;