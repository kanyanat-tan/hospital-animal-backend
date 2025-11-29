const pool = require('../config/pool');
const errors = require('../utils/error')
const encrypt = require('../config/encrypt')

exports.signUp = async (req, res, next) => {
    try {
        let { name, email, password, address, telephone, status, create_date, role } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM role WHERE permission_level = $1', [role])

        if (roleQuery.rowCount === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }
        let role_ID = roleQuery.rows[0].role_id;

        let sqlCheckDupUser = `SELECT * FROM public.customer WHERE email = $1 `;
        let responseCheckDupUser = await pool.query(sqlCheckDupUser, [email])

        if (responseCheckDupUser.rowCount > 0) {
            return res.status(400).json({ status: "fail", message: "User is duplicate" });
        }

        let sql = `INSERT INTO public.customer 
                (name,email,password,address,telephone,status,create_date,roleID)
                VALUES($1,$2,$3,$4,$5,$6,$7,$8)`
        let pwd = await encrypt.hashPassword(password)
        let response = await pool.query(sql, [name, email, pwd, address, telephone, status, create_date, role_ID])
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

exports.signIn = async (req, res, next) => {
    try {
        let { email, password } = req.body

        let sql = `SELECT * FROM public.customer WHERE email = $1 `

        let response = await pool.query(sql, [email])
        if (response.rowCount > 0) {
            const isPwdValid = await encrypt.comparePassword(password, response.rows[0].password)

            let roleQuery = await pool.query('SELECT permission_level FROM role WHERE role_ID  = $1', [response.rows[0].roleid])
            if (roleQuery.rowCount === 0) {
                return res.status(400).json({ status: "error", message: "Invalid role" });
            }
            let role_Name = roleQuery.rows[0].permission_level;
            if (isPwdValid) {
                const token = await encrypt.generateJWT({ name: email, roleName: role_Name, role: response.rows[0].roleid, userid: response.rows[0].customer_id })
                return res.status(200).cookie('jwt', token, ({
                    expires: new Date(Date.now() + 60 * 60 * 1000),
                    httpOnly : true,
                    secure : true,
                    sameSite: "lax"
                })).json({ status: "success", token, data: "Login successfully" })
            } else {
                return res.status(401).json({ status: "error", message: "Password Invaild" });
            }
        } else {
            return res.status(400).json({ status: "error", message: "Invalid input" });

        }
    } catch (error) {
        console.log(error.message);
        errors.mapError(error, 500, "Internal server error", next)
    }
}