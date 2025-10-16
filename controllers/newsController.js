const pool = require('../config/pool');

exports.getAllNews = async (req, res) => {
    try {
        let sql = 'SELECT * FROM public.news'
        let response = await pool.query(sql)
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "No news data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." })
    }
}

exports.getNewsById = async (req, res) => {
    try {
        let { id } = req.params
    let sql = 'SELECT * FROM public.news WHERE news_ID = $1'
    let response = await pool.query(sql, [id])
    if (response.rowCount > 0) {
        return res.status(200).json({ status: "success", data: response.rows[0] })
    } else {
        return res.status(404).json({ status: "error", message: "No news data found" })
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.createNews = async (req, res) => {
    try {
        let { title, content, image_url, create_date, category, role } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM public.role WHERE permission_level = $1', [role])

        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }
        let categoryQuery = await pool.query('SELECT category_ID FROM public.news_category WHERE title = $1', [category])
        console.log(categoryQuery);

        if (categoryQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid category" });
        }
        let role_ID = roleQuery.rows[0].role_id;
        let category_ID = categoryQuery.rows[0].category_id;


        let sql = `INSERT INTO public.news
        (title,content,image_url,create_date,categoryID,roleID)
    VALUES($1,$2,$3,$4,$5,$6)`
        let response = await pool.query(sql, [title, content, image_url, create_date, category_ID, role_ID])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No news data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.updateNews = async (req, res) => {
    try {
        let { id } = req.params
        let { title, content, image_url, create_date, category, role } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM public.role WHERE permission_level = $1', [role])

        if (roleQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }
        let categoryQuery = await pool.query('SELECT category_ID FROM public.news_category WHERE title = $1', [category])

        if (categoryQuery.rows.length === 0) {
            return res.status(400).json({ status: "error", message: "Invalid category" });
        }
        let role_ID = roleQuery.rows[0].role_id;
        let category_ID = categoryQuery.rows[0].category_id;

        let sql = `UPDATE public.news
    SET title = $1, content = $2, image_url = $3, create_date = $4,categoryID = $5 , roleID = $6 
    WHERE news_ID = $7`
        let response = await pool.query(sql, [title, content, image_url, create_date, category_ID, role_ID, id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "updated successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No news data found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message || "Something went wrong on the server." })
    }
}

exports.deleteNews = async (req, res) => {
    try {
        let { id } = req.params
        let sql = `DELETE FROM public.news WHERE news_ID = $1 `
        let response = await pool.query(sql, [id])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "No news data found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." })
    }
}