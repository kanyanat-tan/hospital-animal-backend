const express = require('express');
const { createNewCategory, createNews, updateNews, deleteNews, getAllNews, getNewsById } = require('../controllers/newsController');
const { checkID } = require('../middleware/checkID');

const router = express.Router()
router.route("/")
    .get(getAllNews)
    .post(createNews)

router.route("/:id")
    .patch(checkID, updateNews)
    .delete(checkID, deleteNews)
    .get(checkID, getNewsById)

module.exports = router;