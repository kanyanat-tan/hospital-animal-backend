const pool = require('../config/pool');

exports.getAllAnimal = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.animal'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No animal data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.getAnimalById = async (req, res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.animal WHERE animal_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No animal data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createAnimal = async (req, res) => {
    try {
        let { name, description, breed, customer, hospital } = req.body

        let hospitalQuery = await pool.query('SELECT hospital_ID FROM public.hospital WHERE name = $1', [hospital])

        if (hospitalQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid hospital" });
        }

        let breedQuery = await pool.query('SELECT breed_ID FROM public.breed WHERE name = $1', [breed])

        if (breedQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid breed" });
        }
        
        let hospital_ID = hospitalQuery.rows[0].hospital_id;
        let breed_ID = breedQuery.rows[0].breed_id;

        let sql = `INSERT INTO public.animal
                (name, description, breedID, customerID, hospitalID)
                VALUES($1,$2,$3,$4,$5)`
        let response = await pool.query(sql, [name, description, breed_ID, customer, hospital_ID])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No animal data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.updateAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let { name, description, breed, customer, hospital } = req.body

        let hospitalQuery = await pool.query('SELECT hospital_ID FROM public.hospital WHERE name = $1', [hospital])

        if (hospitalQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid hospital" });
        }

        let breedQuery = await pool.query('SELECT breed_ID FROM public.breed WHERE name = $1', [breed])

        if (breedQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid breed" });
        }
        let hospital_ID = hospitalQuery.rows[0].hospital_id;
        let breed_ID = breedQuery.rows[0].breed_id;

        let sql = `UPDATE public.animal
    SET name = $1, description = $2, breedID = $3, customerID = $4,hospitalID = $5 
    WHERE animal_ID = $6`
        let response = await pool.query(sql, [name, description, breed_ID, customer, hospital_ID, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No animal data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.deleteAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.animal WHERE animal_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No animal data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}