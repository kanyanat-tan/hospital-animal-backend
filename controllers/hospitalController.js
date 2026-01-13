const pool = require('../config/pool');
const errors = require('../utils/error')
const { createHospitalSchema, updateHospitalSchema, hospitalIdSchema } = require('../schemas/hospital.schema')

const { hasResult } = require('../services/dbResult.helper')
const hospitalService = require('../services/hospital.service')
const repo = require('../repositories/hospital.repo')

exports.getAllHospital = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.hospital'
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
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
        const result = hospitalIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid resource id",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.hospital WHERE hospital_ID = $1'
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
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
        const result = updateHospitalSchema.safeParse({ params: req.params, body: req.body })
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        let { name, email, address, image_url, telephone } = result.data.body
        const success = await hospitalService.update(result.data.body, id, repo, pool)
        if (success) {
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
        const result = createHospitalSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { name, email, address, image_url, telephone } = result.data
        const success = await hospitalService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create hospital" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.deleteHospital = async (req, res, next) => {
    try {
        const result = hospitalIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid resource id",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.hospital WHERE hospital_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Hospital not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


