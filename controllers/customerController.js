const pool = require('../config/pool');
const errors = require('../utils/error')
const encrypt = require('../config/encrypt')

exports.getAllCustomer = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.customer'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
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
        let sql = 'SELECT customer_id, name,email,address,telephone,status,create_date,image_url FROM public.customer WHERE customer_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
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
        if (response.rowCount > 0) {
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

        let roleQuery = await pool.query('SELECT role_ID FROM public.role WHERE permission_level = $1', [req.user.role])

        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }

        let role_ID = roleQuery.rows[0].role_id;

        let sql = `UPDATE public.customer
    SET name = $1, email = $2, password = $3, address = $4,telephone = $5, status = $6, create_date = $7, roleID = $8
    WHERE customer_ID = $9`
        let pwd = await encrypt.hashPassword(password)
        let response = await pool.query(sql, [name, email, pwd, address, telephone, status, create_date, role_ID, req.user.userid])
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



