exports.insertPackage = async ({ title }, pool) => {
    let sql = `INSERT INTO public.package
            (title)
            VALUES($1)`
    let response = await pool.query(sql, [title])

    return response.rowCount > 0
}

exports.updatePackage = async ({ title }, id, pool) => {
    let sql = `UPDATE public.package
            SET title = $1
            WHERE package_ID = $2`
    let response = await pool.query(sql, [title, id])

    return response.rowCount > 0
}
