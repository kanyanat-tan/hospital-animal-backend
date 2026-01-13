exports.insertTreatmentInfo = async ({
    name, descriptionanimal, breedid, customerid, hospitalid,
    booking_date, status, roleid,
    title, appointment, weight, sterilization,
    descriptiontreatment
}, pool) => {
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

    return resAnimal.rowCount > 0 && resBooking.rowCount > 0 && restreatment.rowCount > 0

}

exports.updateTreatmentInfo = async ({
    name, descriptionanimal, breedid, customerid, hospitalid,
    booking_date, status, roleid,
    title, appointment, weight, sterilization, descriptiontreatment
}, { animal_id, booking_id, treatmentbooking_id }, pool) => {
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

    return resAnimal.rowCount > 0 && resBooking.rowCount > 0 && restreatment.rowCount > 0
}