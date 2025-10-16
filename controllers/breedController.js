const pool = require('../config/pool');

exports.getAllBreed = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.breed'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No breed data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.getBreedById = async (req, res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.breed WHERE breed_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No breed data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createBreed = async (req, res) => {
    try {
        let { name, species, description, image_url } = req.body
        let sql = `INSERT INTO public.breed
        (name,species,description,image_url)
        VALUES($1,$2,$3,$4)`
        let response = await pool.query(sql, [name, species, description, image_url])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No breed data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })

    }
}

exports.updateBreed = async (req, res) => {
    try {
        let { id } = req.params
        let { name, species, description, image_url } = req.body

        let sql = `UPDATE public.breed
                SET name = $1, species = $2, description = $3, image_url = $4
                WHERE breed_ID = $5`
        let response = await pool.query(sql, [name, species, description, image_url, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No breed data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })

    }
}

exports.deleteBreed = async (req, res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.breed WHERE breed_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message:  "No breed data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}


