const pool = require('../config/pool');
const errors = require('../utils/error')
const { packageMapIdSchema, createPackageMapSchema, createPackageBooingMapSchema, updatePackageBookingSchema, deletePackageBookingSchema } = require('../schemas/packageMap.schema')

const { hasResult } = require('../services/dbResult.helper')
const repo = require('../repositories/packageMap.repo')
const packageMapService = require('../services/packageMap.service')

exports.getAllPackageMap = async (req, res, next) => {
    try {
        let sql = `SELECT bpm.bookingPackageID,bpm.quantity,p.package_ID,p.title
            FROM booking_package_map bpm
            LEFT JOIN package p ON bpm.packageID = p.package_ID;`
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No packageMap data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getPackageMapById = async (req, res, next) => {
    try {
        const result = packageMapIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = `SELECT bpm.bookingPackageID,bpm.quantity,p.package_ID,p.title
            FROM booking_package_map bpm
            JOIN package p ON bpm.packageID = p.package_ID
            WHERE bpm.bookingPackageID = $1;`
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "BookingPackageMap not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createPackageMap = async (req, res, next) => {
    try {
        const result = createPackageMapSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        const success = await packageMapService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


exports.getAllPackageBooking = async (req, res, next) => {
    try {
        let sql = `SELECT 
            b.booking_id,b.booking_date,b.status,b.roleid,b.animalid,b.customerid,
            c.name,c.telephone,
            bp.title,bp.price,
            bpm.bookingpackageid,bpm.packageid,bpm.quantity,bpm.packagedetailid,
            pd.title,pd.price,pd.description,pd.image_url 
            FROM booking b 
            LEFT JOIN customer c ON b.customerid = c.customer_id
            LEFT JOIN booking_package bp ON b.booking_id = bp.bookingid
            LEFT JOIN booking_package_map bpm ON bp.bookingpackage_id = bpm.bookingpackageid
            LEFT JOIN package_detail pd ON bpm.packagedetailid = pd.packagedetail_id;`
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "BookingPackageMap not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getPackageBookingOwnership = async (req, res, next) => {
    try {
        let id = req.user.userid
        let sql = `SELECT 
            b.booking_id,b.booking_date,b.status,b.roleid,b.animalid,b.customerid,
            c.name,c.telephone,
            bp.title,bp.price,
            bpm.bookingpackageid,bpm.packageid,bpm.quantity,bpm.packagedetailid,
            pd.title,pd.price,pd.description,pd.image_url 
            FROM booking b 
            LEFT JOIN customer c ON b.customerid = c.customer_id
            LEFT JOIN booking_package bp ON b.booking_id = bp.bookingid
            LEFT JOIN booking_package_map bpm ON bp.bookingpackage_id = bpm.bookingpackageid
            LEFT JOIN package_detail pd ON bpm.packagedetailid = pd.packagedetail_id
            WHERE c.customer_id = $1`
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "BookingPackageMap not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createPackageBooking = async (req, res, next) => {
    try {
        const result = createPackageBooingMapSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { status, booking_date, roleid, customerid, animalid, title, total, packageid, packageDetailid, quantity } = result.data

        const success = await packageMapService.createPackageBooking(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create packageMap" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.EditPackageBooking = async (req, res, next) => {
    try {
        const result = updatePackageBookingSchema.safeParse({ params: req.params, body: req.body });
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { bookingpackage_id, booking_id, packageid, packagedetail_id } = result.data.params
        let { status, booking_date, roleid, customerid,
            animalid, title, total, quantity } = result.data.body
        const success = await packageMapService.updatePackageBooking(result.data.body, result.data.params, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deletePackageBooking = async (req, res, next) => {
    try {
        const result = deletePackageBookingSchema.safeParse(req.params);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { bookingpackage_id, booking_id, packageid, packagedetail_id } = result.data
        let sqlMap = `DELETE FROM booking_package_map WHERE bookingpackageid = $1 AND packageid = $2 AND packagedetailid = $3`
        let responseMap = await pool.query(sqlMap, [bookingpackage_id, packageid, packagedetail_id])

        let sqlBookingPackage = `DELETE FROM booking_package WHERE bookingpackage_id = $1`
        let responsePacksqlBookingPackage = await pool.query(sqlBookingPackage, [bookingpackage_id])

        let sqlBooking = `DELETE FROM booking WHERE booking_id = $1`
        let responseBooking = await pool.query(sqlBooking, [booking_id])

        if (responseMap.rowCount > 0 && responsePacksqlBookingPackage.rowCount > 0 && responseBooking.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "TreatmentBooking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}



