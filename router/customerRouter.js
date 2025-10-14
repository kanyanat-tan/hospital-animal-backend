const express = require('express');
const { getAllCustomer, signUp } = require('../controllers/customerController.js');
const {createRole} = require('../controllers/roleController.js')


const router = express.Router()
router.route("/").get(getAllCustomer)
router.route("/customer").post(signUp)
router.route("/role").post(createRole)


module.exports = router;