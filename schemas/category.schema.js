const { z } = require('zod');

const createCategorySchema = z.object({
    title: z.string().min(1)
})

const updateCategorySchema = z.object({
    params: z.object({ id: z.number().int().positive() }),
    body: createCategorySchema.partial()
})

const categoryIdSchema = z.object({
    id: z.coerce.number().int().positive()
})

const categoryNameSchema = z.object({
    name: z.string().trim().min(1).max(100)
})

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    categoryIdSchema,
    categoryNameSchema
}