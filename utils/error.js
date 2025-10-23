exports.apiError = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error"
    res.status(err.statusCode).json({status : err.statusCode, message : err.status})
}

exports.mapError = (statusCode,msg,next) => {
    let errors = Error()
    errors.statusCode = statusCode;
    errors.status = msg;
    next(errors)
}