const express = require('express');
const { getAllBreed, createBreed, updateBreed, deleteBreed, getBreedById } = require('../controllers/breedController')
const { checkID, checkGetID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(getAllBreed)
    .post(verifyToken,verifyPermission(['admin']),createBreed)


router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin']),updateBreed)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deleteBreed)
    .get(checkGetID,getBreedById)

module.exports = router;