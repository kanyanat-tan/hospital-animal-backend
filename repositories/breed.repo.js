exports.insertBreed = async ({ name, species, description, image_url }, pool) => {
    let sql = `INSERT INTO public.breed
        (name,species,description,image_url)
        VALUES($1,$2,$3,$4)`
    let response = await pool.query(sql, [name, species, description, image_url])

    return response.rowCount > 0
}

exports.updateBreed = async ({ name, species, description, image_url }, id, pool) => {
    let sql = `UPDATE public.breed
                SET name = $1, species = $2, description = $3, image_url = $4
                WHERE breed_ID = $5`
    let response = await pool.query(sql, [name, species, description, image_url, id])

    return response.rowCount > 0
}