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
        if (response.rowCount > 0) {
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
        let response = await pool.query(sql,[id])
        if (response.rowCount > 0) {
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
        let { status, booking_date, roleid, customerid, animalid, title, total, packageid, packageDetailid, quantity } = req.body;

        let sqlBooking = `INSERT INTO booking (booking_date,status,roleid,animalid,customerid)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING booking_ID;`
        let resBooking = await pool.query(sqlBooking, [booking_date, status, roleid, animalid, customerid])
        let bookingID = resBooking.rows[0].booking_id;

        let sqlBookingPackage = `INSERT INTO booking_package (title, price,bookingid)
            VALUES ($1,$2,$3)
            RETURNING bookingpackage_ID;`
        let resBookingPackage = await pool.query(sqlBookingPackage, [title, total, bookingID])
        let bookingPackageID = resBookingPackage.rows[0].bookingpackage_id;


        let sqlMap = `INSERT INTO booking_package_map (bookingpackageid,packageid, quantity,packagedetailid)
            VALUES ($1,$2,$3,$4)`
        let resMap = await pool.query(sqlMap, [bookingPackageID, packageid, quantity, packageDetailid])

        if (resBooking.rowCount > 0 && resBookingPackage.rowCount > 0 && resMap.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.EditPackageBooking = async (req, res, next) => {
    try {
        let { bookingpackage_id, booking_id, packageid, packagedetail_id } = req.params
        let { status, booking_date, roleid, customerid,
            animalid, title, total, quantity } = req.body;

        let sqlBooking = `UPDATE public.booking
            SET booking_date = $1, status = $2, roleid = $3, animalid = $4, customerid = $5
            WHERE booking_ID = $6`
        let resBooking = await pool.query(sqlBooking, [booking_date, status, roleid, animalid, customerid, booking_id])

        let sqlBookingPackage = `UPDATE public.booking_package
           SET title = $1, price = $2
        WHERE bookingPackage_ID = $3`
        let resBookingPackage = await pool.query(sqlBookingPackage, [title, total, bookingpackage_id])

        let sqlMap = `UPDATE booking_package_map
            SET quantity = $1
            WHERE bookingpackageid = $2 AND packageid = $3 AND packagedetailid = $4`
        let resMap = await pool.query(sqlMap, [quantity,bookingpackage_id, packageid, packagedetail_id])

        if (resBooking.rowCount > 0 && resBookingPackage.rowCount > 0 && resMap.rowCount > 0) {
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
        let { bookingpackage_id, booking_id, packageid, packagedetail_id } = req.params
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



