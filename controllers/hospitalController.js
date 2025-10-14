const pool = require('../config/pool');


exports.getAllHospital = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.hospital'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: error.message || "No hospital data found" })
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.updateHospital = async (req, res) => {
    try {
        let { id } = req.params
        let { name, email, address, image_url, telephone } = req.body
        let sql = `UPDATE public.hospital
    SET name = $1, email = $2, address = $3, image_url = $4,telephone = $5
    WHERE hospital_ID = $6`
        let response = await pool.query(sql, [name, email, address, image_url, telephone, id])
        
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "Hospital updated successfully" })
        } else {
            return res.status(404).json({ status: "error", message: error.message || "No hospital data found" })
        }
    } catch (error) {
         res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}


exports.createHospital = async (req, res) => {
    try {
        let { name, email, address, image_url, telephone } = req.body
        let sql = `INSERT INTO public.hospital
    (name, email, address, image_url,telephone)
    VALUES($1,$2,$3,$4,$5)`
        let response = await pool.query(sql, [name, email, address, image_url, telephone])
        res.status(200).json({ status: "success", data: "create success" })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}


