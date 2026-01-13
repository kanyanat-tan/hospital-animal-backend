const pool = require('../config/pool');
const errors = require('../utils/error')
const { createBreedSchema, updateBreedSchema, breedIdSchema } = require('../schemas/breed.schema')

const { hasResult } = require('../services/dbResult.helper')
const breedService = require('../services/breed.service')
const repo = require('../repositories/breed.repo')

exports.getAllBreed = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.breed'
        let response = await pool.query(sql)
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No breed data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getBreedById = async (req, res, next) => {
    try {
        const result = breedIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = 'SELECT * FROM public.breed WHERE breed_ID = $1'
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows[0] })
        } else {
            return res.status(404).json({ status: "error", message: "Breed not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createBreed = async (req, res, next) => {
    try {
        const result = createBreedSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { name, species, description, image_url } = result.data
        const success = await breedService.create(result.data, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create breed" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateBreed = async (req, res, next) => {
    try {
        const result = updateBreedSchema({ params: req.params, body: req.body })
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params
        let { name, species, description, image_url } = result.data.body
        const success = await breedService.update(result.data.body, id, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Breed not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteBreed = async (req, res, next) => {
    try {
        const result = breedIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid resource id",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.breed WHERE breed_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Breed not found" })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}


