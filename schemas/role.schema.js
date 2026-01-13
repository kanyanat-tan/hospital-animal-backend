const { z } = require('zod');

const createRoleSchema = z.object({
    permission_level: z.string().min(1),
    hospital: z.coerce.number().int().positive()
})

const updateRoleSchema = z.object({
    params: z.object({ id: z.number().int().positive() }),
    body: createRoleSchema.partial()
})

const roleIdSchema = z.object({
    id: z.coerce.number().int().positive(),
})

module.exports = {
    createRoleSchema,
    updateRoleSchema,
    roleIdSchema
}

