const bcrypt = require('bcrypt');
const errors = require('../utils/error')
var jwt = require('jsonwebtoken');

exports.hashPassword = async (plaintextPassword) => {
    if (plaintextPassword) {
        try {
            const hash = await bcrypt.hash(plaintextPassword, 10)
            return hash
        } catch (error) {
            console.log(error.message);
            errors.mapError(500, "Intenal server error", next)
        }
    }
    return null
}

exports.comparePassword = async (plaintextPassword, hash) => {
    const result = await bcrypt.compare(plaintextPassword, hash)
    return result
}

exports.generateJWT = async (data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 1000 })
    return token;
}

exports.verifyToken = async (token) => {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    return result;

}