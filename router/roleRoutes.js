const express = require('express');

const { createRole, getAllRole, getRoleById, deleteRole, updateRole } = require('../controllers/roleController.js')
const { checkID } = require('../middleware/checkID.js')

const router = express.Router()

router.route("/")
    .get(getAllRole)
    .post(createRole)
router.route("/:id")
    .patch(checkID, updateRole)
    .delete(checkID, deleteRole)
    .get(checkID, getRoleById)

module.exports = router;