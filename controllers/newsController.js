const pool = require('../config/pool');
const errors = require('../utils/error')
const { createNewsSchema, updateNewsSchema, newsIdSchema } = require('../schemas/news.schema')

const { hasResult } = require('../services/dbResult.helper')
const newsService = require('../services/news.service')
const repo = require('../repositories/news.repo')

exports.getAllNews = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.news'
        let response = await pool.query(sql)
       if (hasResult(response.rowCount)) {
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
        const result = newsIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid resource id",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.news WHERE news_ID = $1'
        let response = await pool.query(sql, [id])
       if (hasResult(response.rowCount)) {
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
        const result = createNewsSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { title, content, image_url, create_date, categoryid, roleid } = result.data
        const success = await newsService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create news" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateNews = async (req, res, next) => {
    try {
        const result = updateNewsSchema.safeParse({ params: req.params, body: req.body });
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        let { title, content, image_url, create_date, categoryid, roleid } = result.data.body

        const success = await newsService.update(result.data.body, id, repo, pool)
        if (success) {
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
        const result = newsIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid resource id",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.news WHERE news_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "News not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}