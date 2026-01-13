const pool = require('../config/pool');
const errors = require('../utils/error')
const { createBookingPackageSchema, updateBookingPackageSchema, bookingPackageIdSchema } = require('../schemas/bookingPakage.schema')
const { hasResult } = require('../services/dbResult.helper')

const bookingPackageService = require('../services/bookingPackage.service')
const repo = require('../repositories/bookingPackage.repo')


exports.getAllBookingPackage = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.booking_package'
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No bookingPackage data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getBookingPackageById = async (req, res, next) => {
    try {
        const result = bookingPackageIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid resource id",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.booking_package WHERE bookingPackage_ID = $1'
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "BookingPackage not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }

}

exports.createBookingPackage = async (req, res, next) => {

    try {
        const result = createBookingPackageSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { title, price, booking } = result.data
        const success = await bookingPackageService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create package booking" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateBookingPackage = async (req, res, next) => {
    try {
        const result = createBookingPackageSchema.safeParse({ params: req.params, body: req.body });
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        let { title, price, booking } = result.data.body

        const success = await bookingPackageService.update(result.data.body, id, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "BookingPackage not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteBookingPackage = async (req, res, next) => {
    try {
        const result = bookingPackageIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.booking_package WHERE bookingPackage_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "BookingPackage not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}