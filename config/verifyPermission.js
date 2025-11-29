const errors = require('../utils/error')


exports.verifyPermission = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const user = req.user
            if (!user) {
                return res.status(401).json({ status: 401, message: "User not found" });
            }
            const role = user.role.toLowerCase();

            if (!allowedRoles.map(r => r.toLowerCase()).includes(role)) {
                return res.status(403).json({ status: 403, message: "Permission invalid" });
            }

            next()

        } catch (error) {
            console.log(error.message);
            errors.mapError(error, 500, "Internal server error", next)
        }
    }

}


