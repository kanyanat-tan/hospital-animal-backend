const pool = require('../config/pool');
const errors = require('../utils/error')
const { createCategorySchema, updateCategorySchema, categoryIdSchema, categoryNameSchema } = require('../schemas/category.schema');

const categoryService = require('../services/category.service')
const repo = require('../repositories/category.repo')
const { hasResult } = require('../services/dbResult.helper')

exports.getAllNewCategory = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.news_category'
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
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
        const result = categoryIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.news_category WHERE category_ID = $1'
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
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
        const result = createCategorySchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { title } = result.data
        const success = categoryService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create category" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateNewCategory = async (req, res, next) => {
    try {
        const result = updateCategorySchema.safeParse({ params: req.params, body: req.body })
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        let { title } = result.data.body
        const success = await categoryService.update(result.data.body, id, repo, pool)
        if (success) {
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
        const result = categoryIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.news_category WHERE category_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
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
        const result = categoryNameSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource name", error: result.error.errors })
        }
        const { name } = result.data
        const sql = `SELECT nc.category_id, nc.title,n.news_id,n.title,n.content,n.create_date 
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