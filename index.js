const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const path = require('path')
const app = express()
const PORT = config.get('port') || 5000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(compression())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/profile', require('./routes/profile.route'))

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
