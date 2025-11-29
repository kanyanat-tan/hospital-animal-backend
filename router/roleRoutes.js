const express = require('express');

const { createRole, getAllRole, getRoleById, deleteRole, updateRole } = require('../controllers/roleController.js')
const { checkID } = require('../middleware/checkID.js')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken,getAllRole)
    .post(verifyToken,verifyPermission(['admin']),createRole)
router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin']),updateRole)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deleteRole)
    .get(verifyToken,checkID,verifyPermission(['admin']),getRoleById)

module.exports = router;