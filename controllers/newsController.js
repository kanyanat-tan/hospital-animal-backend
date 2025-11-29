const pool = require('../config/pool');
const errors = require('../utils/error')

exports.getAllNews = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.news'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No news data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getNewsById = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = 'SELECT * FROM public.news WHERE news_ID = $1'
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "News not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createNews = async (req, res, next) => {
    try {
        let { title, content, image_url, create_date, categoryid,roleid } = req.body

        let sql = `INSERT INTO public.news
        (title,content,image_url,create_date,categoryID,roleID)
    VALUES($1,$2,$3,$4,$5,$6)`
        let response = await pool.query(sql, [title, content, image_url, create_date, categoryid, roleid])
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

exports.updateNews = async (req, res, next) => {
    try {
        let { id } = req.params
        let { title, content, image_url, create_date, categoryid, roleid } = req.body

        let sql = `UPDATE public.news
    SET title = $1, content = $2, image_url = $3, create_date = $4,categoryID = $5 , roleID = $6 
    WHERE news_ID = $7`
        let response = await pool.query(sql, [title, content, image_url, create_date, categoryid, roleid, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "updated successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "News not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteNews = async (req, res, next) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.news WHERE news_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "News not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}