const pool = require('../config/pool');
const errors = require('../utils/error')
const encrypt = require('../config/encrypt')
const { roleLogic } = require('../services/auth.service')
const customerRepo = require('../repositories/customer.repo')

const { hasResult } = require('../services/dbResult.helper')

exports.getAllCustomer = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.customer'
        let response = await pool.query(sql)
         if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No customer data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getCustomerById = async (req, res, next) => {
    try {
        const id = req.user.userid
        let sql = `
        SELECT c.customer_id, c.name,c.email,c.address,c.telephone,c.status,c.create_date,c.image_url,r.permission_level
        FROM public.customer c
        JOIN role r ON c.roleid = r.role_id
        WHERE customer_ID = $1
        `
        let response = await pool.query(sql, [id])
         if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "Customer not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteCustomer = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.customer WHERE customer_ID = $1 `
        let response = await pool.query(sql, [id])
         if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Customer not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateCustomer = async (req, res, next) => {
    try {
        let { name, email, address, password, telephone, status, create_date } = req.body

        const result1 = await roleLogic(req.body, customerRepo, pool)

        let sql = `UPDATE public.customer
    SET name = $1, email = $2, password = $3, address = $4,telephone = $5, status = $6, create_date = $7, roleID = $8
    WHERE customer_ID = $9`
        let pwd = await encrypt.hashPassword(password)
        let response = await pool.query(sql, [name, email, pwd, address, telephone, status, create_date, result1.role_ID, req.user.userid])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "updated successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Customer not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}



