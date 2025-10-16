const pool = require('../config/pool');

exports.getAllCustomer = async (req, res) => {
    let sql = 'SELECT * FROM public.customer'
    let response = await pool.query(sql)
    console.log(response);
    res.status(200).json({ status: "success", data: response.rowCount[0] })
}

exports.signUp = async (req, res) => {
    try {
        let { name, email, password, address, telephone, status, create_date, role } = req.body

        let roleQuery = await pool.query('SELECT role_ID FROM role WHERE permission_level = $1', [role])

        if (roleQuery.rowCount === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }

        let roleID = roleQuery.rows[0].id;

        let sql = `INSERT INTO public.customer 
    (name,email,password,address,telephone,status,create_date,role)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)`
        let response = await pool.query(sql, [name, email, password, address, telephone, status, create_date, roleID])
        res.status(200).json({ status: "success", data: response.rowCount })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server." });
    }
}


