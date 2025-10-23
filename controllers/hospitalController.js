const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllHospital = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.hospital'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No hospital data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.getHospitalById = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.hospital WHERE hospital_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "Hospital not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateHospital = async (req, res, next) => {
    try {
        let { id } = req.params
        let { name, email, address, image_url, telephone } = req.body
        let sql = `UPDATE public.hospital
    SET name = $1, email = $2, address = $3, image_url = $4,telephone = $5
    WHERE hospital_ID = $6`
        let response = await pool.query(sql, [name, email, address, image_url, telephone, id])

        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "updated successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Hospital not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.createHospital = async (req, res, next) => {
    try {
        let { name, email, address, image_url, telephone } = req.body
        let sql = `INSERT INTO public.hospital
    (name, email, address, image_url,telephone)
    VALUES($1,$2,$3,$4,$5)`
        let response = await pool.query(sql, [name, email, address, image_url, telephone])
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


exports.deleteHospital = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.hospital WHERE hospital_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Hospital not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


