const { verifyToken } = require('../config/encrypt')
const pool = require('../config/pool');
const errors = require('../utils/error')


exports.verifyToken = async (req, res, next) => {
    if (req.headers.authorization == null) {
        return errors.mapError(404, "Token undefine", next);
    }
    const token = req.headers.authorization.split(" ")[1]
    
    if (!token) {
        errors.mapError(401, "Token invaild", next);
    }

    try {
        let data = await verifyToken(token)

         let roleQuery = await pool.query('SELECT permission_level FROM role WHERE role_ID = $1', [data.role])

        if (roleQuery.rowCount === 0) {
            return res.status(400).json({ status: "error", message: "Invalid role" });
        }
        let role_name = roleQuery.rows[0].permission_level;
        
        req.user = {}
        req.user.role = role_name
        req.user.userid = data.userid
        

    } catch (error) {
        console.log(error.message)
        errors.mapError(401, "Token invaild", next);
    }
    next()
}





