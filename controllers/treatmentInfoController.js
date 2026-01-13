const pool = require('../config/pool');
const errors = require('../utils/error')
const { createTreatmentInfoSchema, updateTreatmentInfoSchema, treatmentInfoIdSchema, deleteTreatmentInfoIdSchema } = require('../schemas/treatmentInfo.schema')

const { hasResult } = require('../services/dbResult.helper')
const repo = require('../repositories/treatmentInfo.repo')
const treatmentInfoService = require('../services/treatmentInfo.service');

exports.getAllTreatmentBooking = async (req, res, next) => {
    try {
        const sql = `
        SELECT a.animal_id ,a.name as nameAnimal,a.descriptionanimal,a.breedid,a.customerid,a.hospitalid,
        b.booking_id,b.booking_date,b.status,b.roleid,
        t.treatmentbooking_id,t.title,t.appointment,t.weight,t.sterilization,
        t.descriptiontreatment,c.customer_id, c.name as nameCustomer,c.email,c.telephone
        FROM animal a
        JOIN booking b ON a.animal_id = b.animalid
        JOIN treatment_booking t ON b.booking_id = t.bookingid
        JOIN customer c ON b.customerid = c.customer_id;
    `
        let response = await pool.query(sql);
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

exports.getTreatmentBookingOwnership = async (req, res, next) => {
    try {
        let id = req.user.userid
        let sql = `
        SELECT a.animal_id ,a.name as nameAnimal,a.descriptionanimal,a.breedid,a.customerid,a.hospitalid,
        b.booking_id,b.booking_date,b.status,b.roleid,
        t.treatmentbooking_id,t.title,t.appointment,t.weight,t.sterilization,
        t.descriptiontreatment,c.customer_id, c.name as nameCustomer,c.email,c.telephone
        FROM animal a
        JOIN booking b ON a.animal_id = b.animalid
        JOIN treatment_booking t ON b.booking_id = t.bookingid
        JOIN customer c ON b.customerid = c.customer_id
        WHERE customer_id = $1
    `;
        let response = await pool.query(sql, [id]);
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


exports.getAllTreatmentBookingId = async (req, res, next) => {
    try {
        const result = treatmentInfoIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        const sql = `
        SELECT a.animal_id ,a.name as nameAnimal,a.descriptionanimal,a.breedid,a.customerid,a.hospitalid,
        b.booking_id,b.booking_date,b.status,b.roleid,
        t.treatmentbooking_id,t.title,t.appointment,t.weight,t.sterilization,
        t.descriptiontreatment,c.customer_id, c.name as nameCustomer,c.email,c.telephone
        FROM animal a
        JOIN booking b ON a.animal_id = b.animalid
        JOIN treatment_booking t ON b.booking_id = t.bookingid
        JOIN customer c ON b.customerid = c.customer_id
        WHERE booking_id = $1;
    `;
        let response = await pool.query(sql, [id]);
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(200).json({ status: "success", message: "No treatmentbooking data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateTreatmentBooking = async (req, res, next) => {
    try {
        const result = updateTreatmentInfoSchema.safeParse({ params: req.params, body: req.body });
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        const { animal_id, booking_id, treatmentbooking_id } = result.data.params

        if (!animal_id || !booking_id || !treatmentbooking_id) {
            return res.status(400).json({
                status: "error",
                message: "animal_id, booking_id, and treatmentbooking_id are required"
            })
        }
        const success = await treatmentInfoService.update(result.data.body, result.data.params, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "Update successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createTreatmentBooking = async (req, res, next) => {
    try {
        const result = createTreatmentInfoSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        const success = await treatmentInfoService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "Create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create treatment booking" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteTreatmentBooking = async (req, res, next) => {
    try {
        const result = deleteTreatmentInfoIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { animal_id, booking_id, treatmentbooking_id } = result.data
        let sqlTreatment = `DELETE FROM treatment_booking WHERE treatmentbooking_id = $1`
        let responseTreatment = await pool.query(sqlTreatment, [treatmentbooking_id])

        let sqlBooking = `DELETE FROM booking WHERE booking_id = $1`
        let responseBooking = await pool.query(sqlBooking, [booking_id])

        let sqlAnimal = `DELETE FROM animal WHERE animal_id = $1`
        let responseAnimal = await pool.query(sqlAnimal, [animal_id])

        if (responseAnimal.rowCount > 0 && responseBooking.rowCount > 0 && responseTreatment.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "Delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "TreatmentBooking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}
