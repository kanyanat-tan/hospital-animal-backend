const pool = require('../config/pool');
const errors = require('../utils/error')
const { createTreatmentSchema, treatmentIdSchema, updateTreatmentSchema } = require('../schemas/treatment.schema')

const { hasResult } = require('../services/dbResult.helper')
const repo = require('../repositories/treatment.repo')
const treatmentService = require('../services/treatment.service')

exports.getAllTreatment = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.treatment_booking'
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No treatmentbooking data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getTreatmentById = async (req, res, next) => {
    try {
        const result = treatmentIdSchema.safeParse(req.user.userid)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.treatment_booking WHERE treatmentBooking_ID = $1'
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "TreatmentBooking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createTreatment = async (req, res, next) => {
    try {
        const result = createTreatmentSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { title, appointment, weight, descriptiontreatment, sterilization, booking } = result.data

        const success = await treatmentService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "Create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create treatment" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteTreatment = async (req, res, next) => {
    try {
        const result = treatmentIdSchema.safeParse(req.user.userid)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.treatment_booking WHERE treatmentBooking_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "TreatmentBooking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateTreatment = async (req, res, next) => {
    try {
        const result = updateTreatmentSchema.safeParse({ params: req.params, body: req.body })
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        let { title, appointment, weight, description, sterilization, booking } = result.data.body
        const success = await treatmentService.update(result.data.body, id, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Treatment not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}




