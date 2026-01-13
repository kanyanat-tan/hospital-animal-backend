const pool = require('../config/pool');
const errors = require('../utils/error')
const { createPackageSchema, updatePackageSchema, packageIdSchema } = require('../schemas/package.schema')

const packageService = require('../services/package.service')
const repo = require('../repositories/package.repo')
const { hasResult } = require('../services/dbResult.helper')

exports.getAllPackage = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.package'
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No package data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.getPackageById = async (req, res, next) => {
    try {
        const result = packageIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid resource id",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.package WHERE package_ID = $1'
        let response = await pool.query(sql, [id])
         if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "Package not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createPackage = async (req, res, next) => {
    try {
        const result = createPackageSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { title } = result.data
        const success = await packageService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create package" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deletePackage = async (req, res, next) => {
    try {
        const result = packageIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid resource id",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.package WHERE package_ID = $1 `
        let response = await pool.query(sql, [id])
         if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Package not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updatePackage = async (req, res, next) => {
    try {

        const result = updatePackageSchema.safeParse({ params: req.params, body: req.body })
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        let { title } = result.data.body
        const success = await packageService.update(result.data.body, id, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Package not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}
