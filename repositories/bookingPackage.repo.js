exports.insertBookingPackage = async ({ title, price, booking }, pool) => {
    let sql = ` INSERT INTO public.booking_package
                (title,price,bookingID)
                VALUES($1,$2,$3)`
    let response = await pool.query(sql, [title, price, booking])

    return response.rowCount > 0
}

exports.updateBookingPackage = async ({ title, price, booking }, id, pool) => {
    let sql = `UPDATE public.booking_package
               SET title = $1,price = $2,bookingID = $3
               WHERE bookingPackage_ID = $4`
    let response = await pool.query(sql, [title, price, booking, id])

    return response.rowCount > 0
}

