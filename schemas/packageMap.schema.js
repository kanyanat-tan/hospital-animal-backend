const { z } = require('zod');

const packageMapIdSchema = z.object({
    id: z.coerce.number().int().positive()
})

const createPackageMapSchema = z.object({
    bookingPackage: z.coerce.number().int().positive(),
    package: z.coerce.number().int().positive(),
    quantity: z.number().min(0)
})

const createPackageBooingMapSchema = z.object({
    status: z.string().min(1),
    booking_date: z.coerce.date(),
    roleid: z.coerce.number().int().positive(),
    customerid: z.coerce.number().int().positive(),
    animalid: z.coerce.number().int().positive(),
    title: z.string().min(1),
    total: z.number().min(0),
    packageid: z.coerce.number().int().positive(),
    packageDetailid: z.coerce.number().int().positive(),
    quantity: z.number().min(0)
})

const deletePackageBookingSchema = z.object({
    bookingpackage_id: z.coerce.number().int().positive(),
    booking_id: z.coerce.number().int().positive(),
    packageid: z.coerce.number().int().positive(),
    packagedetail_id: z.coerce.number().int().positive()
})

const updatePackageBookingSchema = z.object({
    params: deletePackageBookingSchema.partial(),
    body: createPackageBooingMapSchema.partial()
})


module.exports = {
    packageMapIdSchema,
    createPackageMapSchema,
    createPackageBooingMapSchema,
    updatePackageBookingSchema,
    deletePackageBookingSchema
}