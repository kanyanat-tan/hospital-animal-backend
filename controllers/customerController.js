const pool = require('../config/pool');

exports.getAllCustomer = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.customer'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No customer data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.getCustomerById = async (req, res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.customer WHERE customer_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No customer data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createCustomer = async (req, res) => {
    try {
        let { name, email, password, address, telephone, status, create_date, role } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM role WHERE permission_level = $1', [role])

        if (roleQuery.rowCount === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }

        let roleID = roleQuery.rows[0].id;

        let sql = `INSERT INTO public.customer 
    (name,email,password,address,telephone,status,create_date,role)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)`
        let response = await pool.query(sql, [name, email, password, address, telephone, status, create_date, roleID])
        res.status(200).json({ status: "success", data: response.rowCount })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." });
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.customer WHERE customer_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No category data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." })
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        let { id } = req.params
        let { name, email, password, address, telephone, status, create_date, role } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM public.role WHERE permission_level = $1', [role])

        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }

        let role_ID = roleQuery.rows[0].role_id;

        let sql = `UPDATE public.customer
    SET name = $1, email = $2, password = $3, address = $4,telephone = $5, status = $6, create_date = $7, roleID = $8
    WHERE customer_ID = $6`
        let response = await pool.query(sql, [name, email, password, address, telephone, status, create_date, role_ID, id])

        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "updated successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No customer data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}



