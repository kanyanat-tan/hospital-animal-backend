const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllAnimal = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.animal'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No animal data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createAnimal = async (req, res, next) => {
    try {
        let { name, description, breed, hospital } = req.body

        let hospitalQuery = await pool.query('SELECT hospital_ID FROM public.hospital WHERE name = $1', [hospital])

        if (hospitalQuery.rows.length === 0) {
            return errors.mapError(404, "No hospital data found", next)
        }

        let breedQuery = await pool.query('SELECT breed_ID FROM public.breed WHERE name = $1', [breed])

        if (breedQuery.rows.length === 0) {
            return errors.mapError(404, "No breed data found", next)
        }

        let hospital_ID = hospitalQuery.rows[0].hospital_id;
        let breed_ID = breedQuery.rows[0].breed_id;

        let sql = `INSERT INTO public.animal
                (name, description, breedID, customerID, hospitalID)
                VALUES($1,$2,$3,$4,$5)`
        let response = await pool.query(sql, [name, description, breed_ID, req.user.userid, hospital_ID])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "Create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getAnimalById = async (req, res, next) => {
    try {
        let id = req.user.userid
        let sql = `SELECT a.name ,a.animal_id ,a.breedid, a.descriptionanimal ,a.hospitalid ,
		        c.name ,c.address ,c.create_date, c.customer_id , c.email ,c.image_url ,c.roleid ,c.status ,c.telephone
                FROM public.customer c
                JOIN animal a on c.customer_id = a.customerid  
                WHERE customer_id = $1`
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateAnimal = async (req, res, next) => {
    try {
        let { id } = req.params
        let { name, description, breed, hospital } = req.body

        let hospitalQuery = await pool.query('SELECT hospital_ID FROM public.hospital WHERE name = $1', [hospital])

        if (hospitalQuery.rows.length === 0) {
            return errors.mapError(404, "No hospital data found", next)
        }

        let breedQuery = await pool.query('SELECT breed_ID FROM public.breed WHERE name = $1', [breed])

        if (breedQuery.rows.length === 0) {
            return errors.mapError(404, "No breed data found", next)
        }
        let hospital_ID = hospitalQuery.rows[0].hospital_id;
        let breed_ID = breedQuery.rows[0].breed_id;

        let sql = `UPDATE public.animal
    SET name = $1, description = $2, breedID = $3, customerID = $4,hospitalID = $5 
    WHERE animal_ID = $6`
        let response = await pool.query(sql, [name, description, breed_ID, req.user.userid, hospital_ID, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "Update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteAnimal = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.animal WHERE animal_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "Delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}