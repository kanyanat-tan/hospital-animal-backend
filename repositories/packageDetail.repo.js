exports.insertPackageDetail = async ({title, price, description, image_url}, pool) => {
    let sql = `INSERT INTO public.package_detail
            (title,price,description,image_url)
            VALUES($1,$2,$3,$4)`
    let response = await pool.query(sql, [title, price, description, image_url])

    return response.rowCount > 0
}
