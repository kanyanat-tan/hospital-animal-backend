const express = require('express');
const { getAllCustomer, getCustomerById, deleteCustomer, updateCustomer } = require('../controllers/customerController.js');
const { checkID } = require('../middleware/checkID.js')
const { verifyToken } = require('../config/verifyToken.js')
const { verifyPermission } = require('../config/verifyPermission.js')
const { signUp, signIn,signUpStaff } = require('../controllers/userService.js')


const router = express.Router()

router.route("/")
    .get(verifyToken,verifyPermission(['admin',]),getCustomerById)
    .patch(verifyToken,verifyPermission(['admin','user','doctor']),updateCustomer)

router.route("/:id")
    .get(verifyToken, checkID,verifyPermission(['admin','user','doctor']), getCustomerById)
    .delete(verifyToken, checkID,verifyPermission(['admin']),deleteCustomer)

router.route("/signup")
    .post(signUp)

router.route("/signup/staff")
    .post(verifyToken,verifyPermission(['admin',]),signUpStaff)

router.route("/login")
    .post(signIn)



module.exports = router;