const pool = require('../config/pool');
const errors = require('../utils/error')

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
        let response = await pool.query(sql,[id]);
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


exports.getAllTreatmentBookingId = async (req, res, next) => {
    try {
        const { id } = req.params
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
        if (response.rowCount > 0) {
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
        const { animal_id, booking_id, treatmentbooking_id } = req.params
        let { name, descriptionanimal, breedid, customerid, hospitalid,
            booking_date, status, roleid,
            title, appointment, weight, sterilization, descriptiontreatment} = req.body;

        if (!animal_id || !booking_id || !treatmentbooking_id) {
            return res.status(400).send("Missing ID(s)")
        }
        let sqlAnimal = ` UPDATE public.animal
                SET name = $1, descriptionanimal = $2, breedid = $3, customerid = $4, hospitalid = $5
                WHERE animal_id = $6`
        let resAnimal = await pool.query(sqlAnimal, [name, descriptionanimal, breedid, customerid, hospitalid, animal_id])

        let sqlbooking = `UPDATE public.booking
                SET booking_date = $1, status = $2, roleid = $3, animalid = $4, customerid = $5
                WHERE booking_ID = $6`

        let resBooking = await pool.query(sqlbooking, [booking_date, status, roleid, animal_id, customerid, booking_id])

        let sqltreatment = `UPDATE public.treatment_booking
                SET title = $1, appointment = $2, weight = $3, descriptiontreatment = $4, sterilization = $5,bookingid = $6
                WHERE treatmentbooking_id = $7`
        let restreatment = await pool.query(sqltreatment, [title, appointment, weight, descriptiontreatment, sterilization, booking_id, treatmentbooking_id])

        if (resAnimal.rowCount > 0 && resBooking.rowCount > 0 && restreatment.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
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
        let { name, descriptionanimal, breedid, customerid, hospitalid,
            booking_date, status, roleid,
            title, appointment, weight, sterilization,
            descriptiontreatment } = req.body;

        let sqlAnimal = `INSERT INTO public.animal
                (name, descriptionanimal, breedID, customerID, hospitalID)
                VALUES($1,$2,$3,$4,$5)
                RETURNING animal_ID`
        let resAnimal = await pool.query(sqlAnimal, [name, descriptionanimal, breedid, customerid, hospitalid])
        let animalID = resAnimal.rows[0].animal_id;

        let sqlbooking = `INSERT INTO public.booking
                    (booking_date,status,roleID,animalID,customerID)
                    VALUES($1,$2,$3,$4,$5)
                    RETURNING booking_ID`
        let resBooking = await pool.query(sqlbooking, [booking_date, status, roleid, animalID, customerid])
        let bookingID = resBooking.rows[0].booking_id;

        let sqltreatment = `INSERT INTO public.treatment_booking
                (title,appointment,weight,descriptiontreatment,sterilization,bookingID)
                VALUES($1,$2,$3,$4,$5,$6)`
        let restreatment = await pool.query(sqltreatment, [title, appointment, weight, descriptiontreatment, sterilization, bookingID])

        if (resAnimal.rowCount > 0 && resBooking.rowCount > 0 && restreatment.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteTreatmentBooking = async (req, res, next) => {

    try {
        let { animal_id, booking_id, treatmentbooking_id } = req.params
        let sqlTreatment = `DELETE FROM treatment_booking WHERE treatmentbooking_id = $1`
        let responseTreatment = await pool.query(sqlTreatment, [treatmentbooking_id])

        let sqlBooking = `DELETE FROM booking WHERE booking_id = $1`
        let responseBooking = await pool.query(sqlBooking, [booking_id])

        let sqlAnimal = `DELETE FROM animal WHERE animal_id = $1`
        let responseAnimal = await pool.query(sqlAnimal, [animal_id])

        if (responseAnimal.rowCount > 0 && responseBooking.rowCount > 0 && responseTreatment.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "TreatmentBooking not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}
