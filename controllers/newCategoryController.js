const pool = require('../config/pool');

exports.getAllNewCategory = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.news_category'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No categoey data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." })
    }
}

exports.getNewsCategoryById = async (req, res) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.news_category WHERE category_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "No categoey data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createNewCategory = async (req, res) => {
    try {
        let { title } = req.body
        let sql = `INSERT INTO public.news_category
                (title)
                VALUES($1)`
        let response = await pool.query(sql, [title])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No categoey data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.updateNewCategory = async (req, res) => {
    try {
        let { id } = req.params
        let { title } = req.body
        let sql = `UPDATE public.news_category
                SET title = $1, 
                WHERE category_ID = $2`
        let response = await pool.query(sql, [title, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "updated successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No category data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.deleteNewCategory = async (req, res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.news_category WHERE category_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No category data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." })
    }
}