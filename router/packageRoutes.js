const express = require('express');
const { getAllPackage, getPackageById, createPackage, deletePackage, updatePackage } = require('../controllers/packageController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllPackage)
    .post(createPackage)


router.route("/:id")
    .patch(checkID, updatePackage)
    .delete(checkID, deletePackage)
    .get(checkID, getPackageById)

module.exports = router;