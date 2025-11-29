const express = require('express');
const { createNewCategory, createNews, updateNews, deleteNews, getAllNews, getNewsById } = require('../controllers/newsController');
const { checkID } = require('../middleware/checkID');
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')

const router = express.Router()
router.route("/")
    .get(getAllNews)
    .post(verifyToken,verifyPermission(['admin','doctor']),createNews)

router.route("/:id")
    .patch(verifyToken,checkID,verifyPermission(['admin','doctor']),updateNews)
    .delete(verifyToken,checkID,verifyPermission(['admin','doctor']),deleteNews)
    .get(getNewsById)

module.exports = router;