const errors = require('../utils/error')

exports.checkID = (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id) || Number(id) < 0) {
        return errors.mapError(400, "Request param invalid type", next);
    }
    next()
}

