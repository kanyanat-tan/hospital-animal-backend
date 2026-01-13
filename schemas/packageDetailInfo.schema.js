const { z } = require('zod');

const createPackageDetailInfoSchema = z.object({
    title: z.string().min(1),
    price: z.number().min(0),
    description: z.string().trim().min(1),
    image_url: z.string().url().nullish(),
    packageid: z.coerce.number().int().positive()
})

const updatePackageDetailInfoSchema = z.object({
    params: z.object({ id: z.coerce.number().int().positive() }),
    body: createPackageDetailInfoSchema.partial()
})

const packageDetailInfoIdSchema = z.object({
    id: z.coerce.number().int().positive(),
})

const packageDetailInfoNameSchema = z.object({
    name: z.string().trim().min(1).max(100)
})
module.exports = {
    packageDetailInfoIdSchema,
    packageDetailInfoNameSchema,
    updatePackageDetailInfoSchema,
    createPackageDetailInfoSchema
}