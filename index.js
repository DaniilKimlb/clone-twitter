const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

const PORT = config.get('port') || 5000

app.use('/api/auth', require('./routes/auth.route'))

async function start() {
    try {
        await mongoose.connect(config.get('connect-mongodb'), {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
        })
        app.listen(PORT, () => {
            console.log('The server is running on the port ' + PORT)
        })
    } catch (error) {
        console.log(`Server Error ${error.message}`)
        process.exit(1)
    }
}
start()
