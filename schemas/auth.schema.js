const { z } = require('zod');

exports.logInSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(0, "Password must be at least 8 characters")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[a-zA-Z]/, "Password must contain a letter")
});

exports.signUpSchema = z.object({
    name: z
        .string().min(1, "Name is required"),
    email: z
        .string()
        .email("Invalid email format"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[a-zA-Z]/, "Password must contain a letter"),
    address: z
        .string(),
    telephone: z
        .string()
        .min(9, "Telephone must be at least 9 digits")
        .max(10, "Telephone must be at most 10 digits")
        .regex(/^[0-9]+$/, "Telephone must contain only numbers"),
    status: z.string(),
    create_date: z.coerce.date(),
    role: z.string()
});

exports.signUpStaffSchema = z.object({
    name: z
        .string(),
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[a-zA-Z]/, "Password must contain a letter"),
    address: z
        .string(),
    telephone: z
        .number()
        .min(1, "Password must be at least 1 characters")
        .max(10),
    status: z.string(),
    create_date: z.string(),
    role: z.string()
})