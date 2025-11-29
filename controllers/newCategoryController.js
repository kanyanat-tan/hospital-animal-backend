const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllNewCategory = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.news_category'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No newCategory data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getNewsCategoryById = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.news_category WHERE category_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "NewCategoey not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createNewCategory = async (req, res, next) => {
    try {
        let { title } = req.body
        let sql = `INSERT INTO public.news_category
                (title)
                VALUES($1)`
        let response = await pool.query(sql, [title])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateNewCategory = async (req, res, next) => {
    try {
        let { id } = req.params
        let { title } = req.body
        let sql = `UPDATE public.news_category
                SET title = $1
                WHERE category_ID = $2`
        let response = await pool.query(sql, [title, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "updated successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "NewCategory not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteNewCategory = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.news_category WHERE category_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "NewCategory not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getAllNewCategoryName = async (req, res, next) => {
    try {
        const { name } = req.params
        const sql =`SELECT nc.category_id, nc.title,n.news_id,n.title,n.content,n.create_date 
            FROM public.news_category nc
            JOIN news n ON nc.category_id = n.categoryid
            WHERE nc.title = $1`
        const response = await pool.query(sql, [name]);
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "NewCategoey not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}