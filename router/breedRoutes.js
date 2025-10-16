const express = require('express');
const { getAllBreed, createBreed, updateBreed,deleteBreed,getBreedById } = require('../controllers/breedController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllBreed)
    .post(createBreed)


router.route("/:id")
    .patch(checkID, updateBreed)
    .delete(checkID,deleteBreed)
    .get(checkID,getBreedById)

module.exports = router;