const jwt = require('jsonwebtoken')

const signJwt = (idUser, email, role) => {
    return jwt.sign({ email, role }), process.env.TOKEN_SECRET, { expiresIn: '7d', subject: idUser }
}

const verifyJwt = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET)
}

module.exports = {
    signJwt,
    verifyJwt
}