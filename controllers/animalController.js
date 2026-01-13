const pool = require('../config/pool');
const errors = require('../utils/error')
const { createAnimalSchema, updateAnimalSchema, animalIdSchema } = require('../schemas/animal.schema')

const { animalLogic } = require('../services/auth.service')
const repo = require('../repositories/animal.repo')
const { hasResult } = require('../services/dbResult.helper')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

console.log(prisma);


exports.getAllAnimal = async (req, res, next) => {
    try {
        let sql = 'SELECT * FROM public.animal'
        let response = await pool.query(sql)
        // let response = await prisma.animal.findMany()
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(200).json({ status: "success", message: "No animal data found", data: [] })
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.createAnimal = async (req, res, next) => {
    try {
        const result = createAnimalSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        const resolvedAnimal = await animalLogic(result.data, repo, pool)

        const success = await animalService.create(result.data, resolvedAnimal, req.user.userid, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "Create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create animal" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.getAnimalById = async (req, res, next) => {
    try {
        const result = animalIdSchema.safeParse(req.user.userid)
        if (!result.success) {
            return res.status(401).json({
                message: "Invalid authentication data",
                error: result.error.errors
            })
        }
        let { id } = result.data
        let sql = `SELECT a.name ,a.animal_id ,a.breedid, a.descriptionanimal ,a.hospitalid ,
		        c.name ,c.address ,c.create_date, c.customer_id , c.email ,c.image_url ,c.roleid ,c.status ,c.telephone
                FROM public.customer c
                JOIN animal a on c.customer_id = a.customerid  
                WHERE customer_id = $1`
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: response.rows })
        } else {
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.updateAnimal = async (req, res, next) => {
    try {
        const result = updateAnimalSchema.safeParse({ params: req.params, body: req.body })
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid body",
                error: result.error.errors
            });
        }
        let { id } = result.data.params

        const resolvedAnimal = await animalLogic(result.data, animalRepo, pool)

        const success = await animalService.update(result.data.body, resolvedAnimal, req.user.userid, id, repo, pool)
        if (success) {
            return res.status(200).json({ status: "success", data: "Update successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}

exports.deleteAnimal = async (req, res, next) => {
    try {
        const result = animalIdSchema.safeParse(req.params)
        if (!result.success) {
            return res.status(400).json({ message: "Invalid resource id", error: result.error.errors })
        }
        let { id } = result.data
        let sql = `DELETE FROM public.animal WHERE animal_ID = $1 `
        let response = await pool.query(sql, [id])
        if (hasResult(response.rowCount)) {
            return res.status(200).json({ status: "success", data: "Delete successfully" })
        } else {
            return res.status(404).json({ status: "error", message: "Animal not found" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(500, "Internal server error", next)
    }
}