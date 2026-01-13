const { z } = require('zod')


const createNewsSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    image_url: z.string().url().nullish(),
    create_date: z.date(),
    categoryid: z.coerce.number().int().positive(),
    roleid: z.coerce.number().int().positive()
})

const updateNewsSchema = z.object({
    params: z.object({ id: z.number().int().positive() }),
    body: createNewsSchema.partial()
})

const newsIdSchema = z.object({
    id: z.coerce.number().int().positive()
})

module.exports = {
    createNewsSchema,
    updateNewsSchema,
    newsIdSchema
}