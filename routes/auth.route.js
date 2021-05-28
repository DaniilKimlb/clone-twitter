const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { query, body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const nodemailer = require('nodemailer')
const sendrid = require('nodemailer-sendgrid-transport')
const router = Router()
const crypto = require('crypto')

const transporter = nodemailer.createTransport(
    sendrid({
        auth: {
            api_key: config.get('SENDGRID_API_KEY'),
        },
    })
)

// Регистрация
router.post(
    '/signup',
    [
        body('email', 'Invalid email entered').isEmail(),
        body('name', 'Invalid name entered').isString(),
        body('password', 'Incorrect password entered (min: 6)')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .exists(),
        body('dayOfBirth').isLength({ min: 1 }),
        body('yearOfBirth').isLength({ min: 1 }),
        body('monthOfBirth').isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: 'validation error',
                    error: errors.array(),
                })
            }
            const {
                name,
                email,
                password,
                dayOfBirth,
                yearOfBirth,
                monthOfBirth,
            } = req.body
            const candidate = await User.findOne({ email })
            if (candidate && !candidate.active) {
                await User.findOneAndDelete({ email })
            }
            if (candidate && candidate.active) {
                return res
                    .status(400)
                    .json({ message: 'User with this email already exists' })
            }
            const passwordHash = await bcrypt.hash(password, 12)
            crypto.randomBytes(6, async (err, buffer) => {
                if (err) {
                    return res.status(500).json({
                        message:
                            'Something went wrong while creating the token',
                    })
                }
                const token = buffer.toString('hex')
                const user = new User({
                    email,
                    name,
                    confirmToken: token,
                    confirmTokenExp: Date.now() + 60 * 60 * 1000,
                    password: passwordHash,
                    dateOfBirth: new Date(
                        +yearOfBirth,
                        +monthOfBirth,
                        +dayOfBirth
                    ),
                })
                await user.save()
                res.status(201).json({ message: 'New User created' })
                await transporter.sendMail(
                    require('../email/confirm')(email, token)
                )
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong while registration',
            })
        }
    }
)

// Вход
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' })
        }
        const pas = await bcrypt.compare(password, user.password)
        if (!pas) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' })
        }
        const token = jwt.sign(
            { userId: user.id },
            config.get('secrete-code-jwt'),
            { expiresIn: '1h' }
        )
        res.json({ token, userId: user.id })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong while logging in',
        })
    }
})

// Проверка на занятость электронной почты
router.get(
    '/emailVerification',
    query('email', 'Invalid email entered').isEmail(),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: 'validation error',
                    error: errors.array(),
                })
            }
            const { email } = req.query
            const user = await User.findOne({ email })
            if (!user || !user.active) {
                return res.json({
                    message: 'User with this email does not exist',
                })
            }
            res.status(400).json({
                message: 'User with this email already exists',
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong while logging in',
            })
        }
    }
)

// Подтверждение электронной почты, и активация аккаунта
router.put(
    '/confirmEmail',
    body('email', 'Invalid email entered').isEmail(),
    body('token', 'Invalid token entered').isString(),
    async (req, res) => {
        try {
            const { email, token } = req.body
            const user = await User.findOne({
                email,
                confirmTokenExp: { $gt: Date.now() },
                confirmToken: token,
            })
            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }
            const countSameNames =
                (await User.find({ name: user.name }).select('active')).map(
                    (el) => el.active
                ).length - 1 || ''
            user.confirmTokenExp = null
            user.confirmToken = null
            user.active = true
            user.username =
                '@' +
                user.name
                    .trim()
                    .split(' ')
                    .map(
                        (el) =>
                            el.charAt(0).toUpperCase() + el.slice(1, el.length)
                    )
                    .join('') +
                countSameNames
            await user.save()
            const jswToken = jwt.sign(
                { userId: user._id },
                config.get('secrete-code-jwt'),
                { expiresIn: '1h' }
            )
            res.json({
                token: jswToken,
                message: 'User verified',
                userId: user.id,
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong when confirming the email',
            })
        }
    }
)

// Отправка письма на электронную почту для сброса пароля
router.post(
    '/reset',
    body('email', 'Invalid email entered').isEmail(),
    async (req, res) => {
        try {
            const { email } = req.body
            crypto.randomBytes(6, async (err, buffer) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: 'Something went wrong' })
                }
                const token = buffer.toString('hex')
                const candidate = await User.findOne({ email })
                if (!candidate || !candidate.active) {
                    return res
                        .status(400)
                        .json({ message: 'Could not find user' })
                } else {
                    candidate.resetToken = token
                    candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                    await candidate.save()
                    res.json({ message: 'Confirmation email sent' })
                    await transporter.sendMail(
                        require('../email/reset')(req.body.email, token)
                    )
                }
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong while resetting your password',
            })
        }
    }
)

// Проверка токена для сброса пароля
router.get(
    '/checkTokenForReset',
    query('email', 'Invalid email entered').isEmail(),
    async (req, res) => {
        try {
            const user = await User.findOne({
                email: req.query.email,
                resetTokenExp: { $gt: Date.now() },
                resetToken: req.query.token,
            }).select('resetToken')
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid token specified',
                })
            }
            res.json({
                message: 'The token is correct',
                resetToken: user.resetToken,
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong while resetting your password',
            })
        }
    }
)

// Изменение пароля
router.put(
    '/password',
    body('password', 'Incorrect password entered (min: 6)')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .exists(),
    async (req, res) => {
        try {
            const { token, email, password } = req.body
            const user = await User.findOne({
                resetTokenExp: { $gt: Date.now() },
                resetToken: token,
                email: email,
            })
            if (user) {
                user.password = await bcrypt.hash(password, 10)
                user.resetToken = null
                user.resetTokenExp = null
                await user.save()
                return res.json({ message: 'Password changed' })
            } else {
                return res
                    .status(400)
                    .json({ message: 'Invalid token specified' })
            }
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong while resetting your password',
            })
        }
    }
)

module.exports = router
