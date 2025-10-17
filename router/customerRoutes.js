const express = require('express');
const { getAllCustomer, createCustomer, getCustomerById, deleteCustomer,updateCustomer } = require('../controllers/customerController.js');
const { checkID } = require('../middleware/checkID.js')


const router = express.Router()

router.route("/")
                .post(checkID, createCustomer)
                .get(getAllCustomer)

router.route("/:id")
                .get(checkID, getCustomerById)
                .delete(checkID, deleteCustomer)
                .patch(checkID,updateCustomer)




module.exports = router;