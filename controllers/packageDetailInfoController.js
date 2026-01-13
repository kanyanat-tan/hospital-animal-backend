const pool = require('../config/pool');
const errors = require('../utils/error')
const { createPackageDetailInfoSchema, updatePackageDetailInfoSchema, packageDetailInfoIdSchema, packageDetailInfoNameSchema } = require('../schemas/packageDetailInfo.schema')

const { hasResult } = require('../services/dbResult.helper')
const repo = require('../repositories/packageDetailInfo.repo')
const packageDetailInfoService = require('../services/packageDetailInfo.service')

exports.getPackageDetailByPackageName = async (req, res, next) => {
    try {
        const result = packageDetailInfoNameSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource name", error: result.error.errors })
        }
        let { name } = result.data
        let sql = `
           SELECT d.packageid, p.title, d.packagedetail_id, d.description, d.price, d.image_url,d.title
            FROM public.package p
            JOIN package_detail d ON p.package_id = d.packageid
            WHERE p.title = $1
        `
        let response = await pool.query(sql, [name])

        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getPackageDetailByPackage = async (req, res, next) => {
    try {
        let sql = `
           SELECT d.packageid, p.title, d.packagedetail_id, d.description, d.price, d.image_url,d.title
            FROM public.package p
            JOIN package_detail d ON p.package_id = d.packageid;        `
        let response = await pool.query(sql)

        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.packageDetailCreate = async (req, res, next) => {
    try {
        const result = createPackageDetailInfoSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { title, price, description, image_url, packageid } = result.data

        const success = await packageDetailInfoService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully " })
        } else {
            return res.status(404).json({ status: "error", message: "Failed to create packagedetail" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getPackageDetailId = async (req, res, next) => {
    try {
        const result = packageDetailInfoIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.package_detail WHERE packagedetail_ID = $1'
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

exports.updatePackageDetailInfo = async (req, res, next) => {
    try {
        const result = updatePackageDetailInfoSchema.safeParse({ params: req.params, body: req.body });
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        let { title, price, description, image_url, packageid } = result.data.body

        const success = await packageDetailInfoService.update(result.data.body, id, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}
