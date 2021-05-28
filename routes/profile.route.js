const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const multer = require('../middleware/file.middleware')
const config = require('config')
const { body, validationResult } = require('express-validator')
const router = Router()

// Получение профиля
router.get('/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(400).json({
                message:
                    'To get the user, you must specify the parameter "userId"',
            })
        }
        const user = await User.findOne({ _id: userId }).select(
            'name email avatar aboutMe dateOfBirth cap username'
        )
        res.json(user)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong when getting a profile',
        })
    }
})

// Изменение аватарки
router.put('/avatar', auth, multer.single('avatar'), async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.userId })
        if (!req.file) {
            return res.status(400).json({
                message:
                    'To update the avatar, you must send in the request body file (image / jpeg, image / jpg, image / png) with the key "avatar"',
            })
        }
        const avatar = config.get('BASE_URL_SERVER') + req.file.path
        user.avatar = avatar
        await user.save()
        res.json({ message: 'Avatar has been changed', avatar })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong when updating the avatar',
        })
    }
})

// Изменение шабки профиля
router.put('/cap', auth, multer.single('cap'), async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.userId })
        if (!req.file) {
            return res.status(400).json({
                message:
                    'To update the avatar, you must send in the request body file (image / jpeg, image / jpg, image / png) with the key "cap"',
            })
        }
        const cap = config.get('BASE_URL_SERVER') + req.file.path
        user.cap = cap
        await user.save()
        res.json({ message: 'Cap has been changed', cap })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong when updating the cap',
        })
    }
})

// Изменение информации о себе
router.put(
    '/aboutMe',
    auth,
    [
        body('aboutMe', 'Invalid aboutMe entered')
            .isString()
            .isLength({ min: 1, max: 160 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    message: 'Validation error',
                    error: errors.array(),
                })
            }
            const { aboutMe } = req.body
            if (!aboutMe) {
                return res.status(400).json({
                    message:
                        'The field "aboutMe" yourself must be present in the request body',
                })
            }
            const user = await User.findOne({ _id: req.user.userId })
            user.aboutMe = aboutMe
            await user.save()
            res.json({ message: 'AboutMe has been changed' })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong when updating the aboutMe',
            })
        }
    }
)

module.exports = router
