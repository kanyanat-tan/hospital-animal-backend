const { z } = require('zod');

const createAnimalSchema = z.object({
    name: z.string(),
    description: z.string(),
    breed: z.string(),
    hospital: z.string()
})

const updateAnimalSchema = z.object({
    params: z.object({ id: z.coerce.number().int().positive() }),
    body: createAnimalSchema.partial()
})

const animalIdSchema = z.object({
    id: z.coerce.number().int().positive(),
})

module.exports = {
    createAnimalSchema,
    updateAnimalSchema,
    animalIdSchema
}