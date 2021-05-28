const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { required: true, type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: String,
    confirmToken: String,
    confirmTokenExp: Date,
    resetTokenExp: Date,
    resetToken: String,
    active: { required: true, type: Boolean, default: false },
    avatar: String,
    cap: String,
    aboutMe: String,
    dateOfBirth: { required: true, type: Date },
})

module.exports = model('User', schema)
