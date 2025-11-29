const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllTreatment = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.treatment_booking'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
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
        let { id } = req.params
        let sql = 'SELECT * FROM public.treatment_booking WHERE treatmentBooking_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
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
        let { title, appointment, weight, descriptiontreatment, sterilization, booking } = req.body

        let sql = `INSERT INTO public.treatment_booking
                (title,appointment,weight,descriptiontreatment,sterilization,bookingID)
                VALUES($1,$2,$3,$4,$5,$6)`
        let response = await pool.query(sql, [title, appointment, weight, descriptiontreatment, sterilization, booking])
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

exports.deleteTreatment = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.treatment_booking WHERE treatmentBooking_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
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
        let { id } = req.params
        let { title, appointment, weight, description, sterilization, booking } = req.body

        let sql = `UPDATE public.treatment_booking
                SET title = $1, appointment = $2, weight = $3, description = $4,sterilization = $5, bookingID = $6
                WHERE treatmentBooking_ID = $7`
        let response = await pool.query(sql, [title, appointment, weight, description, sterilization, booking, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Treatment not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}




