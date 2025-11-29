const errors = require('../utils/error')

exports.checkID = (req, res, next) => {
    const userid = Number(req.user.userid);
    if (Number.isNaN(userid) || userid < 0) {
        return errors.mapError(400, "Request param invalid type", next);
    }
    next()
}

