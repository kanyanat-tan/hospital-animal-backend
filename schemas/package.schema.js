const { z } = require('zod');

const createPackageSchema = z.object({
    title: z.string().min(1)
})

const updatePackageSchema = z.object({
    params: z.object({ id: z.number().int().positive() }),
    body: createPackageSchema.partial()
})

const packageIdSchema = z.object({
    id: z.coerce.number().int().positive(),
})

module.exports = {
    createPackageSchema,
    updatePackageSchema,
    packageIdSchema
}