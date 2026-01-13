exports.insertHospital = async ({ name, email, address, image_url, telephone }, pool) => {
    let sql = `INSERT INTO public.hospital
    (name, email, address, image_url,telephone)
    VALUES($1,$2,$3,$4,$5)`
    let response = await pool.query(sql, [name, email, address, image_url, telephone])

    return response.rowCount > 0
}

exports.updateHospital = async ({ name, email, address, image_url, telephone }, id, pool) => {
    let sql = `UPDATE public.hospital
    SET name = $1, email = $2, address = $3, image_url = $4,telephone = $5
    WHERE hospital_ID = $6`
    let response = await pool.query(sql, [name, email, address, image_url, telephone, id])

    return response.rowCount > 0
}