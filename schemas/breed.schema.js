const { z } = require('zod');

const createBreedSchema = z.object({
    name: z.string().min(1),
    species: z.string().min(1),
    description: z.string().trim().min(1),
    image_url: z.string().url().nullish()
})

const updateBreedSchema = z.object({
    params: z.object({ id: z.number().int().positive() }),
    body: createBreedSchema.partial()
})

const breedIdSchema = z.object({
    id: z.coerce.number().int().positive(),
})

module.exports = {
    createBreedSchema,
    updateBreedSchema,
    breedIdSchema
}