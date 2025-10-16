const express = require('express');
const { getAllPackageMap, getPackageMapById, createPackageMap, deletePackageMap } = require('../controllers/packageMapController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllPackageMap)
    .post(createPackageMap)


router.route("/:id")
    .delete(checkID, deletePackageMap)
    .get(checkID, getPackageMapById)

module.exports = router;