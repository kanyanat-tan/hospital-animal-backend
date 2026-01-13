const { z } = require('zod');

const createBookingSchema = z.object({
    booking_date: z.coerce.date(),
    status: z.string().min(1),
    animal: z.coerce.number().int().positive(),
})
const updateBookingSchema = z.object({
    params: z.object({ id: z.coerce.number().int().positive() }),
    body: createBookingSchema.partial()
})
const bookingIdSchema = z.object({
    id: z.coerce.number().int().positive()
})
module.exports = {
    createBookingSchema,
    bookingIdSchema,
    updateBookingSchema
}