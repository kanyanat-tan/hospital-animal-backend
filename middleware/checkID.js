const errors = require('../utils/error')

exports.checkID = (req, res, next) => {
    const userid = Number(req.user.userid);
    if (Number.isNaN(userid) || userid < 0) {
        return errors.mapError(400, "Request param invalid type", next);
    }
    next()
}

exports.checkGetID = (req, res, next) => {
    const { id } = req.params
    if (!/^\d+$/.test(id) || Number(id) <= 0) {
        return errors.mapError(400, "Request param invalid type", next);
    }
    next()
}

exports.checkName = (req, res, next) => {
    const { name } = req.params
    if (!/^[ก-ฮะ-๙\s]+$/.test(name)) {
        return errors.mapError(400, "message: 'Invalid name. Only letters are allowed.", next)
    }
    next()
}

