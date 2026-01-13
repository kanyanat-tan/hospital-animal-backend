const pool = require('../config/pool');
const errors = require('../utils/error')
const { createBookingSchema, bookingIdSchema, updateBookingSchema } = require('../schemas/booking.schema')
const roleRepo = require('../repositories/customer.repo')
const { roleLogic } = require('../services/auth.service')

const { hasResult } = require('../services/dbResult.helper')
const repo = require('../repositories/booking.repo')
const bookingService = require('../services/booking.service')

exports.getAllBooking = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.booking'
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
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
        const result = bookingIdSchema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
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
        const result = createBookingSchema.safeParse({ body: req.body });
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        const roleid = await roleLogic(result.data, roleRepo, pool)

        const success = await bookingService.create(result.data, roleid, req.user.userid, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create booking" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)

    }
}

exports.updateBooking = async (req, res, next) => {
    try {
        const result = updateBookingSchema.safeParse({ params: req.params, body: req.body });
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        const roleid = await roleLogic(req.user, roleRepo, pool)

        const success = await bookingService.update(result.data.body, roleid, req.user.userid, id, repo, pool)
        if (success) {
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
        const result = bookingIdSchema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.booking WHERE booking_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "Delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Booking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

