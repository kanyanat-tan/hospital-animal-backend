const { z } = require('zod');

const createPackageDetailSchema = z.object({
    title: z.string().min(1),
    price: z.number().min(0),
    description: z.string().trim().min(1),
    image_url: z.string().url().nullish()
})

const updatePackageDetailSchema = z.object({
    params: z.object({ id: z.number().int().positive() }),
    body: createPackageDetailSchema.partial()
})

const packageDetailIdSchema = z.object({
    id: z.coerce.number().int().positive(),
})

module.exports = {
    createPackageDetailSchema,
    packageDetailIdSchema,
    updatePackageDetailSchema
}