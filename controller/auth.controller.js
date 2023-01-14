const UserModel = require("../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const saltRounds = 10;

const MESSAGE_ERROR_EMAIL = 'Email already exists.'
const MESSAGE_ERROR_PROVIDE = 'Provide email and password'
const MESSAGE_ERROR_LOGIN = 'Incorrect email or password'

const SignUpController = (req, res, next) => {
    const { email, password, username, name, surname, address, phoneNumber } = req.body

    if (email === "" || password === "") {
        res.status(400).json(MESSAGE_ERROR_PROVIDE)
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json(MESSAGE_ERROR_LOGIN)
        return
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if (!passwordRegex.test(password)) {
        res.status(400).json({
            message:
                "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."
        })
        return
    }

    UserModel
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json(MESSAGE_ERROR_EMAIL)
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, name, surname, address, phoneNumber })
        })
        .then((createdUser) => {
            const { email, username, _id, name, surname, address, phoneNumber } = createdUser

            const user = { email, username, _id, name, surname, address, phoneNumber }
            res.status(201).json({ user: user })
        })
        .catch((err) => next(err))
}

const LoginController = (req, res, next) => {
    const { username, password } = req.body

    if (username === "" || password === "") {
        res.status(400).json(MESSAGE_ERROR_PROVIDE)
        return
    }

    UserModel
        .findOne({ username })
        .then((foundUser) => {
            if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
                const { _id, email, username, name, surname, address, phoneNumber } = foundUser
                const payload = { _id, email, username, name, surname, address, phoneNumber }

                const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: "HS256",
                    expiresIn: "7d"
                })
                res.status(200).json({ authToken: authToken })
            } else {
                res.status(400).json(MESSAGE_ERROR_LOGIN)
            }
        })
        .catch((err) => next(err))
}

module.exports = {
    SignUpController,
    LoginController
}