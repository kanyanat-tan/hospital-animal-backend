const pool = require('../config/pool');


exports.getAllPackage = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.package'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No package data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}


exports.getPackageById = async (req, res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.package WHERE package_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No package data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createPackage = async (req, res) => {
    try {
        let { title, packageDetail } = req.body
        let sql = `INSERT INTO public.package
            (title,packageID)
            VALUES($1,$2)`
        let response = await pool.query(sql, [title, packageDetail])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No package data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.deletePackage = async (req, res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.package WHERE package_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No package data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message:  error.message || "Something went wrong on the server." })
    }
}

exports.updatePackage = async (req, res) => {
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
            return res.status(404).json({ status: "error", message: "No package data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}
