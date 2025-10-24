const express = require('express');
const { createNewCategory, getAllNewCategory, getNewsCategoryById, updateNewCategory, deleteNewCategory } = require('../controllers/newCategoryController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(verifyToken, verifyPermission(['user', 'admin', 'doctor']), getAllNewCategory)
    .post(verifyToken, verifyPermission(['admin']), createNewCategory)


router.route("/:id")
    .get(verifyToken, checkID, verifyPermission(['user', 'admin', 'doctor']), getNewsCategoryById)
    .delete(verifyToken, checkID,verifyPermission(['admin']), deleteNewCategory)
    .patch(verifyToken, checkID,verifyPermission(['admin']), updateNewCategory)


module.exports = router;