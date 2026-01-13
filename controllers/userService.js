const pool = require('../config/pool');
const errors = require('../utils/error')
const encrypt = require('../config/encrypt')
const { logInSchema, signUpSchema, signUpStaffSchema } = require('../schemas/auth.schema')
const { signInLogic, signUpLogic } = require("../services/auth.service")
const customerPepo = require('../repositories/customer.repo')


exports.signUp = async (req, res, next) => {
    try {
        const result = signUpSchema.safeParse(req.body)
        if (!result.success) {
            console.log(result.error.message);
            return res.status(400).json({
                message: "Invalid request",
                errors: result.error.errors
            })
        }
        let { name, email, password, address, telephone, status, create_date, role } = result.data

        const result1 = await signUpLogic(result.data, customerPepo, pool)

        let sql = `INSERT INTO public.customer 
                (name,email,password,address,telephone,status,create_date,roleID)
                VALUES($1,$2,$3,$4,$5,$6,$7,$8)`
        let pwd = await encrypt.hashPassword(password)
        let response = await pool.query(sql, [name, email, pwd, address, telephone, status, create_date, result1.role_ID])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "create successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(error, 500, "Internal server error", next)
    }
}

exports.signUpStaff = async (req, res, next) => {
    try {
        const result = signUpStaffSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid request",
                errors: result.error.errors
            })
        }
        let { name, email, password, address, telephone, status, create_date, role } = result.data

        const result1 = await signUpLogic(result.data, customerPepo, pool)

        let sql = `INSERT INTO public.customer 
                (name,email,password,address,telephone,status,create_date,roleID)
                VALUES($1,$2,$3,$4,$5,$6,$7,$8)`
        let pwd = await encrypt.hashPassword(password)
        let response = await pool.query(sql, [name, email, pwd, address, telephone, status, create_date, result1.role_ID])
        if (response.rowCount > 0) {
            return res.status(200).json({ status: "success", data: "created successfully" })
        } else {
            return res.status(400).json({ status: "error", message: "Failed to create user" });
        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(error, 500, "Internal server error", next)
    }
}

exports.signIn = async (req, res, next) => {
    try {
        const result = logInSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({
                message: "Invalid request",
                errors: result.error.errors
            })
        }
        const { email, password } = result.data

        const user = await signInLogic(email, password, {
            findByEmail: async (email) => {
                let sql = `SELECT * FROM public.customer WHERE email = $1 `
                let response = await pool.query(sql, [email])
                return response
            }
        })

        if (user.rowCount > 0) {
            const isPwdValid = await encrypt.comparePassword(password, user.rows[0].password)

            let roleQuery = await pool.query('SELECT permission_level FROM role WHERE role_ID  = $1', [user.rows[0].roleid])
            if (roleQuery.rowCount === 0) {
                return res.status(400).json({ status: "error", message: "Invalid role" });
            }

            let role_Name = roleQuery.rows[0].permission_level;
            if (isPwdValid) {
                const token = await encrypt.generateJWT({ name: email, roleName: role_Name, role: user.rows[0].roleid, userid: user.rows[0].customer_id })
                return res.status(200).cookie('jwt', token, ({
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax"
                })).json({ status: "success", token, data: "Login successfully" })
            } else {
                return res.status(401).json({ status: "error", message: "Invalid password" });
            }
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });

        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(error, 500, "Internal server error", next)
    }
}