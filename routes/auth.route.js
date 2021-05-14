const { Router } = require('express')
const { User } = require('../../Twitter/models/User')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()

router.post(
    '/registration',
    [
        body('email', 'Invalid email entered').isEmail(),
        body('password', 'Incorrect password entered (min: 6)')
            .isLength({ min: 6 })
            .isAlphanumeric()
            .exists(),
        body('dayOfBirth').isLength({ min: 1 }).isNumeric(),
        body('yearOfBirth').isLength({ min: 1 }).isNumeric(),
        body('monthOfBirth').isLength({ min: 1 }).isNumeric(),
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
            const { email, password, dayOfBirth, yearOfBirth, monthOfBirth } =
                req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: 'User with this email already exists' })
            }
            const passwordHash = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                password: passwordHash,
                dataOfBirth: { dayOfBirth, yearOfBirth, monthOfBirth },
            })
            await user.save()
            res.status(201).json({ message: 'New User created' })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong while registration',
            })
        }
    }
)

router.post('/login', async (req, res) => {
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
            { algorithm: 'RS256' }
        )
        res.json({ token, userId: user.id })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong while logging in',
        })
    }
})

module.exports = router
