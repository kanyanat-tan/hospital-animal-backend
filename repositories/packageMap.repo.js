exports.insertPackageMap = async ({ bookingPackage, package, quantity }, pool) => {
    let sql = `INSERT INTO booking_package_map (bookingPackageID, packageID,quantity)
            VALUES ($1,$2,$3);`
    let response = await pool.query(sql, [bookingPackage, package, quantity])

    return response.rowCount > 0
}

exports.insertPackageBooking = async ({
    status, booking_date, roleid, customerid, animalid, title, total, packageid, packageDetailid, quantity
}, pool) => {
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


    return resBooking.rowCount > 0 && resBookingPackage.rowCount > 0 && resMap.rowCount > 0
}

exports.updatePackageBooking = async ({
    status, booking_date, roleid, customerid,
    animalid, title, total, quantity },
    { bookingpackage_id, booking_id, packageid, packagedetail_id },
    pool) => {
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
    let resMap = await pool.query(sqlMap, [quantity, bookingpackage_id, packageid, packagedetail_id])

    return resBooking.rowCount > 0 && resBookingPackage.rowCount > 0 && resMap.rowCount > 0
}