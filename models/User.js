const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { required: true, type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: {
        dayOfBirth: { type: Number, required: true },
        yearOfBirth: { type: Number, required: true },
        monthOfBirth: { type: Number, required: true },
    },
})

module.export = model('User', schema)
