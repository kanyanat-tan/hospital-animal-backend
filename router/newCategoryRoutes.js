const express = require('express');
const { createNewCategory, getAllNewCategory, getNewsCategoryById, updateNewCategory, deleteNewCategory, getAllNewCategoryName } = require('../controllers/newCategoryController')
const { checkID, checkName, checkGetID } = require('../middleware/checkID')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()

router.route("/")
    .get(getAllNewCategory)
    .post(verifyToken,verifyPermission(['admin','doctor']),createNewCategory)


router.route("/:id")
    .get(checkGetID,getNewsCategoryById)
    .delete(verifyToken,checkID,verifyPermission(['admin']),deleteNewCategory)
    .patch(verifyToken,checkID,verifyPermission(['admin']),updateNewCategory)

router.route("/by-name/:name")
    .get(checkName,getAllNewCategoryName)


module.exports = router;