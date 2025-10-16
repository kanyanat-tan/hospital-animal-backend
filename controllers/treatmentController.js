const pool = require('../config/pool');


exports.getAllTreatmentBooking = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.treatment_booking'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No treatmentBooking data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.getTreatmentById = async (req,res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.treatment_booking WHERE treatmentBooking_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No treatmentBooking data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createTreatmentBooking = async (req,res) => {
     try {
        let {title,appointment,weight,description,sterilization,booking} = req.body

        let sql = `INSERT INTO public.treatment_booking
                (title,appointment,weight,description,sterilization,bookingID)
                VALUES($1,$2,$3,$4,$5,$6)`
        let response = await pool.query(sql, [title,appointment,weight,description,sterilization,booking])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No treatmentBooking data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.deleteTreatment = async (req,res) => {
     try {
        let { id } = req.params
        let sql = `DELETE FROM public.treatment_booking WHERE treatmentBooking_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No treatmentBooking data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.updateTreatment = async (req,res) => {
      try {
        let { id } = req.params
       let {title,appointment,weight,description,sterilization,booking} = req.body

        let sql = `UPDATE public.treatment_booking
                SET title = $1, appointment = $2, weight = $3, description = $4,sterilization = $5, bookingID = $6
                WHERE treatmentBooking_ID = $7`
        let response = await pool.query(sql, [title,appointment,weight,description,sterilization,booking, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No treatmentBooking data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}