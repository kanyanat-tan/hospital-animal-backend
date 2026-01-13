exports.insertRole = async ({ permission, hospital }, pool) => {
    let sql = `INSERT INTO public.role
                (permission_level,hospitalid)
                VALUES($1,$2)`
    let response = await pool.query(sql, [permission, hospital])

    return response.rowCount > 0
}

exports.updateRole = async ({ permission, hospital }, id, pool) => {
    let sql = `UPDATE public.role
                SET permission_level = $1, hospitalID = $2
                WHERE role_ID = $3
    `
    let response = await pool.query(sql, [permission, hospital, id])

    return response.rowCount > 0
}
