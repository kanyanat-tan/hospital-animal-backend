const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllRole = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.role'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(200).json({ status: "success", message: "No role data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getRoleById = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.role WHERE role_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "Role not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createRole = async (req, res, next) => {
    try {
        let { permission, hospital } = req.body
        let sql = `INSERT INTO public.role
                (permission_level,hospitalID)
                VALUES($1,$2)`
        let response = await pool.query(sql, [permission, hospital])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteRole = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.role WHERE role_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Role not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateRole = async (req, res, next) => {
    try {
        let { id } = req.params
        let { permission, hospital } = req.body

        let sql = `
                 UPDATE public.role
                 SET permission_level = $1, hospitalID = $2
                 WHERE role_ID = $3
    `
        let response = await pool.query(sql, [permission, hospital, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Role not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}
