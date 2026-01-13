const { z } = require('zod')

const createTreatmentInfoSchema = z.object({
    name: z.string().min(1),
    descriptionanimal: z.string().trim().min(1),
    breedid: z.coerce.number().int().positive(),
    customerid: z.coerce.number().int().positive(),
    hospitalid: z.coerce.number().int().positive(),
    booking_date: z.coerce.date(),
    status: z.string().min(1),
    roleid: z.coerce.number().int().positive(),
    title: z.string().min(1),
    appointment: z.coerce.date(),
    weight: z.number().min(0),
    sterilization: z.string().min(1),
    descriptiontreatment: z.string().trim().min(1)
})

const deleteTreatmentInfoIdSchema = z.object({
    animal_id: z.coerce.number().int().positive(),
    booking_id: z.coerce.number().int().positive(),
    treatmentbooking_id: z.coerce.number().int().positive()
})

const updateTreatmentInfoSchema = z.object({
    params: deleteTreatmentInfoIdSchema.partial(),
    body: createTreatmentInfoSchema.partial()
})

const treatmentInfoIdSchema = z.object({
    id: z.coerce.number().int().positive()
})



module.exports = {
    createTreatmentInfoSchema,
    treatmentInfoIdSchema,
    updateTreatmentInfoSchema,
    deleteTreatmentInfoIdSchema
}