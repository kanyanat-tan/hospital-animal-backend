const { z } = require('zod')

const createBookingPackageSchema = z.object({
    booking: z.coerce.number().int().positive(),
    price: z.coerce.number().min(0),
    title: z.string().min(1),
    
})

const updateBookingPackageSchema = z.object({
    params: z.object({ id: z.coerce.number().int().positive() }),
    body: createBookingPackageSchema.partial()
})

const bookingPackageIdSchema = z.object({
    id: z.coerce.number().int().positive()
})

module.exports = {
    createBookingPackageSchema,
    updateBookingPackageSchema,
    bookingPackageIdSchema

}