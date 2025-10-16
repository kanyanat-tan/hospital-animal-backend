const pool = require('../config/pool');

exports.getAllPackageDetail = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.package_detail'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No packageDetail data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." })
    }
}

exports.getPackageDetailById = async (req, res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.package_detail WHERE packageDetail_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No packageDetail data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createPackageDetail = async (req, res) => {
    try {
        let { title, price, description } = req.body

        let sql = `INSERT INTO public.package_detail
            (title,price,description)
            VALUES($1,$2,$3)`
        let response = await pool.query(sql, [title, price, description])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No packageDetail data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.deletePackageDetail = async (req,res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.package_detail WHERE packageDetail_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No packageDetail data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." })
    }
}

exports.updatePackageDetail = async (req, res) => {
    try {
        let { id } = req.params
        let { title, price, description } = req.body

        let sql = `UPDATE public.package_detail
            SET title = $1, price = $2, description = $3
            WHERE packageDetail_ID = $4`
        let response = await pool.query(sql, [title, price, description, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No packageDetail data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}