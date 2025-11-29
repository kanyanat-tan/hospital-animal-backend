const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getPackageDetailByPackageName = async (req, res, next) => {
    try {
        let { name } = req.params
        let sql = `
           SELECT d.packageid, p.title, d.packagedetail_id, d.description, d.price, d.image_url,d.title
            FROM public.package p
            JOIN package_detail d ON p.package_id = d.packageid
            WHERE p.title = $1
        `
        let response = await pool.query(sql, [name])

        if (response.rowCount > 0) {
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

        if (response.rowCount > 0) {
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
        let { title, price, description, image_url, packageid } = req.body
        
        let sql = `INSERT INTO public.package_detail
            (title,price,description,image_url,packageid)
            VALUES($1,$2,$3,$4,$5)`

        const response = await pool.query(sql, [title, price, description, image_url,packageid])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully " })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getPackageDetailId = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.package_detail WHERE packagedetail_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
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
        let { id } = req.params
        let { title, price, description, image_url, packageid } = req.body

        let sql = `UPDATE public.package_detail
            SET title = $1, price = $2, description = $3, image_url = $4, packageid = $5
            WHERE packageDetail_ID = $6`
        let response = await pool.query(sql, [title, price, description,image_url,packageid, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "PackageDetail not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}
