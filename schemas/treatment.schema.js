const { z } = require('zod');

const createTreatmentSchema = z.object({
    title: z.string().min(1),
    appointment: z.coerce.date(),
    weight: z.number().min(0),
    descriptiontreatment: z.string().trim().min(1),
    sterilization: z.string().min(1),
    booking: z.coerce.number().int().positive()
})
const updateTreatmentSchema = z.object({
    params: z.object({ id: z.coerce.number().int().positive() }),
    body: createTreatmentSchema.partial()
})

const treatmentIdSchema = z.object({
    id: z.coerce.number().int().positive()
})

module.exports = {
    createTreatmentSchema,
    treatmentIdSchema,
    updateTreatmentSchema
}