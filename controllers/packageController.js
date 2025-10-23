const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllPackage = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.package'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No package data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.getPackageById = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.package WHERE package_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "Package not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createPackage = async (req, res, next) => {
    try {
        let { title, packageDetail } = req.body
        let sql = `INSERT INTO public.package
            (title,packageID)
            VALUES($1,$2)`
        let response = await pool.query(sql, [title, packageDetail])
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

exports.deletePackage = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.package WHERE package_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Package not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updatePackage = async (req, res, next) => {
    try {
        let { id } = req.params
        let { title, packageDetail } = req.body

        let sql = `UPDATE public.package
            SET title = $1, packageID = $2
            WHERE package_ID = $3`
        let response = await pool.query(sql, [title, packageDetail, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Package not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}
