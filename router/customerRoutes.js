const express = require('express');
const { getAllCustomer, signUp, getCustomerById, deleteCusmoter,updateCustomer } = require('../controllers/customerController.js');
const { checkID } = require('../middleware/checkID.js')


const router = express.Router()

router.route("/")
                .post(checkID, signUp)
                .get(getAllCustomer)

router.route("/:id")
                .get(checkID, getCustomerById)
                .delete(checkID, deleteCusmoter)
                .patch(checkID,updateCustomer)




module.exports = router;