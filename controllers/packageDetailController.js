const pool = require('../config/pool');
const errors = require('../utils/error')
const { createPackageDetailSchema, updatePackageDetailSchema, packageDetailIdSchema } = require('../schemas/packageDetail.schema')

const { hasResult } = require('../services/dbResult.helper')
const repo = require('../repositories/packageDetail.repo')
const packageDetailService = require('../services/packageDetail.service')

exports.getAllPackageDetail = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.package_detail'
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No packageDetail data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getPackageDetailById = async (req, res, next) => {
    try {
        const result = packageDetailIdSchema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.package_detail WHERE packageDetail_ID = $1'
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.createPackageDetail = async (req, res, next) => {
    try {
        const result = createPackageDetailSchema.safeParse({ body: req.body });
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { title, price, description, image_url } = result.data

        const success = await packageDetailService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create packagedetail" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deletePackageDetail = async (req, res, next) => {
    try {
        const result = packageDetailIdSchema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.package_detail WHERE packageDetail_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

