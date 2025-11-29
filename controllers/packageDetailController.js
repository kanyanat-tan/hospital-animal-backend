const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllPackageDetail = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.package_detail'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No packageDetail data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getPackageDetailById = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.package_detail WHERE packageDetail_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.createPackageDetail = async (req, res, next) => {
    try {
        let { title, price, description } = req.body

        let sql = `INSERT INTO public.package_detail
            (title,price,description)
            VALUES($1,$2,$3)`
        let response = await pool.query(sql, [title, price, description])
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

exports.deletePackageDetail = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.package_detail WHERE packageDetail_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

