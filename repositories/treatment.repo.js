exports.insertTreatment = async ({ title, appointment, weight, descriptiontreatment, sterilization, booking }, pool) => {
    let sql = `INSERT INTO public.treatment_booking
                (title,appointment,weight,descriptiontreatment,sterilization,bookingID)
                VALUES($1,$2,$3,$4,$5,$6)`
    let response = await pool.query(sql, [title, appointment, weight, descriptiontreatment, sterilization, booking])

    return response.rowCount > 0
}

exports.updateTreatment = async ({ title, appointment, weight, description, sterilization, booking }, id, pool) => {
    let sql = `UPDATE public.treatment_booking
                SET title = $1, appointment = $2, weight = $3, descriptiontreatment = $4,sterilization = $5, bookingID = $6
                WHERE treatmentBooking_ID = $7`
    let response = await pool.query(sql, [title, appointment, weight, description, sterilization, booking, id])

    return response.rowCount > 0
}