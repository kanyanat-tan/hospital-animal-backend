const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllBooking = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.booking'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No booking data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getBookingById = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.booking WHERE booking_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.createBooking = async (req, res, next) => {
    try {
        let { booking_date, status, role, animal } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM public.role WHERE permission_level = $1', [role])

        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }

        let role_ID = roleQuery.rows[0].role_id;

        let sql = `INSERT INTO public.booking
        (booking_date,status,roleID,animalID)
        VALUES($1,$2,$3,$4)`
        let response = await pool.query(sql, [booking_date, status, role_ID, animal])
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

exports.updateBooking = async (req, res, next) => {
    try {
        let { id } = req.params
        let { booking_date, status, role, animal } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM public.role WHERE permission_level = $1', [role])

        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }

        let role_ID = roleQuery.rows[0].role_id;

        let sql = `UPDATE public.booking
                SET booking_date = $1, status = $2, roleID = $3, animalID = $4
                WHERE booking_ID = $5`
        let response = await pool.query(sql, [booking_date, status, role_ID, animal, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteBooking = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.booking WHERE booking_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

