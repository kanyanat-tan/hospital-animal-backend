const express = require('express');
const { getAllBreed, createBreed, updateBreed,deleteBreed,getBreedById } = require('../controllers/breedController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['user','admin','doctor']),getAllBreed)
    .post(verifyToken,verifyPermission(['admin','doctor']),createBreed)


router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin','doctor']), updateBreed)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deleteBreed)
    .get(verifyToken,checkID,verifyPermission(['admin','doctor']),getBreedById)

module.exports = router;