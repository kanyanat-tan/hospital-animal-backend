const pool = require('../config/pool');


exports.getAllBookingPackage = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.booking_package'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No bookingPackage data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.getBookingPackageById = async (req, res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.booking_package WHERE bookingPackage_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No bookingPackage data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createBookingPackage = async (req, res) => {
    try {
        let { title, appointment, price, status, booking } = req.body

        let sql = `INSERT INTO public.booking_package
        (title,appointment,price,status,bookingID)
    VALUES($1,$2,$3,$4,$5)`
        let response = await pool.query(sql, [title, appointment, price, status, booking])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No bookingPackage data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.updateBookingPackage = async (req, res) => {
    try {
        let { id } = req.params
        let { title, appointment, price, status, booking } = req.body
        let sql = `UPDATE public.booking_package
            SET title = $1, appointment = $2,price = $2,status = $2,bookingID = $5
            WHERE bookingPackage_ID = $3`
        let response = await pool.query(sql, [title, appointment, price, status, booking, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No bookingPackage data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.deleteBookingPackage = async (req, res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.booking_package WHERE bookingPackage_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No bookingPackage data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}