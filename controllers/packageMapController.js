const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllPackageMap = async (req, res, next) => {
    try {
        let sql = `SELECT bpm.bookingPackageID,bpm.quantity,p.package_ID,p.title
            FROM booking_package_map bpm
            LEFT JOIN package p ON bpm.packageID = p.package_ID;`
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
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
        let { id } = req.params
        let sql = `SELECT bpm.bookingPackageID,bpm.quantity,p.package_ID,p.title
            FROM booking_package_map bpm
            JOIN package p ON bpm.packageID = p.package_ID
            WHERE bpm.bookingPackageID = $1;`
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
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
        let { bookingPackage, package, quantity } = req.body;

        let sql = `INSERT INTO booking_package_map (bookingPackageID, packageID,quantity)
            VALUES ($1, $2,$3);`
        let response = await pool.query(sql, [bookingPackage, package, quantity])
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

exports.deletePackageMap = async (req, res, next) => {
    try {
        let { bookingPackageID, packageID } = req.params
        let sql = `DELETE FROM booking_package_map
            WHERE bookingPackageID = $1 AND packageID = $2;`
        let response = await pool.query(sql, [bookingPackageID, packageID])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "BookingPackageMap not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


