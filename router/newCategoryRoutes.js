const express = require('express');
const { createNewCategory, getAllNewCategory, getNewsCategoryById, updateNewCategory, deleteNewCategory } = require('../controllers/newCategoryController')
const { checkID } = require('../middleware/checkID')

const router = express.Router()

router.route("/")
    .get(getAllNewCategory)
    .post(createNewCategory)


router.route("/:id")
    .get(checkID, getNewsCategoryById)
    .delete(checkID, deleteNewCategory)
    .patch(checkID, updateNewCategory)


module.exports = router;