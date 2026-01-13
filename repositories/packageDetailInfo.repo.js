exports.insertPackageDetailInfo = async ({ title, price, description, image_url, packageid }, pool) => {
    let sql = `INSERT INTO public.package_detail
            (title,price,description,image_url,packageid)
            VALUES($1,$2,$3,$4,$5)`

    const response = await pool.query(sql, [title, price, description, image_url, packageid])

    return response.rowCount > 0

}

exports.updatePackageDetailInfo = async ({ title, price, description, image_url, packageid }, id, pool) => {
    let sql = `UPDATE public.package_detail
            SET title = $1, price = $2, description = $3, image_url = $4, packageid = $5
            WHERE packageDetail_ID = $6`
    let response = await pool.query(sql, [title, price, description, image_url, packageid, id])

    return response.rowCount > 0

}