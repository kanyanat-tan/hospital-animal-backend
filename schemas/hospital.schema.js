const { z } = require('zod');

const createHospitalSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    address: z.string(),
    image_url: z.string().url().nullish(),
    telephone: z.number()
        .min(1, "Password must be at least 1 characters")
        .max(10),
})

const updateHospitalSchema = z.object({
    params: z.object({ id: z.number().int().positive() }),
    body: createHospitalSchema.partial()
})

const hospitalIdSchema = z.object({
    id: z.coerce.number().int().positive(),
})

module.exports = {
    createHospitalSchema,
    updateHospitalSchema,
    hospitalIdSchema
}