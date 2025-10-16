const pool = require('../config/pool');

exports.getAllBooking = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.booking'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No booking data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.getBookingById = async (req, res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.booking WHERE booking_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No booking data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}


exports.createBooking = async (req, res) => {
    try {
        let { booking_date, status, role, animal } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM public.role WHERE permission_level = $1', [role])

        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }

        let role_ID = roleQuery.rows[0].role_id;

        let sql = `INSERT INTO public.booking
        (booking_date,status,roleID,animalID)
        VALUES($1,$2,$3,$4)`
        let response = await pool.query(sql, [booking_date, status, role_ID, animal])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No booking data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })

    }
}

exports.updateBooking = async (req,res) => {
try {
        let { id } = req.params
         let { booking_date, status, role, animal } = req.body

       let roleQuery = await pool.query('SELECT role_ID FROM public.role WHERE permission_level = $1', [role])

        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }

        let role_ID = roleQuery.rows[0].role_id;
        
        let sql = `UPDATE public.booking
                SET booking_date = $1, status = $2, roleID = $3, animalID = $4
                WHERE booking_ID = $5`
        let response = await pool.query(sql, [booking_date, status,role_ID,animal,id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No booking data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.booking WHERE booking_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No booking data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

