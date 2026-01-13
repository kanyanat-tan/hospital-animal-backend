exports.insertBooking = async ({ booking_date, status, animal }, role, userid, pool) => {
    let sql = `INSERT INTO public.booking
            (booking_date,status,roleID,animalID,customerID)
            VALUES($1,$2,$3,$4,$5)`
    let response = await pool.query(sql, [booking_date, status, role, animal, userid])

    return response.rowCount > 0
}

exports.update = async ({ booking_date, status, animal }, role, userid, id, pool) => {
    let sql = `UPDATE public.booking
                    SET booking_date = $1, status = $2, roleID = $3, animalID = $4, customerID = $5
                    WHERE booking_ID = $6`
    let response = await pool.query(sql, [booking_date, status, role, animal, userid, id])

    return response.rowCount > 0
}