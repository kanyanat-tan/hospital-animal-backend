const express = require('express');
const { createNewCategory, getAllNewCategory, getNewsCategoryById, updateNewCategory, deleteNewCategory, getAllNewCategoryName } = require('../controllers/newCategoryController')
const { checkID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(getAllNewCategory)
    .post(verifyToken,verifyPermission(['admin','doctor']),createNewCategory)


router.route("/:id")
    .get(getNewsCategoryById)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deleteNewCategory)
    .patch(verifyToken,checkID,verifyPermission(['admin']),updateNewCategory)

router.route("/by-name/:name")
    .get(getAllNewCategoryName)


module.exports = router;