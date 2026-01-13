exports.findHospitalName = async (hospital, pool) => {
    const result = await pool.query(
        'SELECT hospital_ID FROM public.hospital WHERE name = $1',
        [hospital]
    )

    return result
}

exports.findBreedName = async (breed, pool) => {
    const result = await pool.query(
        'SELECT breed_ID FROM public.breed WHERE name = $1',
        [breed]
    )
    return result
}


exports.insertAnimal = async ({ name, description }, { hospital_ID, breed_ID },userid, pool) => {
    let sql = `INSERT INTO public.animal
                    (name, descriptionanimal, breedID, customerID, hospitalID)
                    VALUES($1,$2,$3,$4,$5)`
    let response = await pool.query(sql, [name, description, breed_ID, userid, hospital_ID])

    return response.rowCount > 0
}

exports.updateAnimal = async ({ name, description }, { hospital_ID, breed_ID }, userid, id, pool) => {
    let sql = `UPDATE public.animal
            SET name = $1, descriptionanimal = $2, breedID = $3, customerID = $4,hospitalID = $5 
            WHERE animal_ID = $6`
    let response = await pool.query(sql, [name, description, breed_ID, userid, hospital_ID, id])

    return response.rowCount > 0
}


