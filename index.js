const express = require('express')
const path = require('path')
const app = express()

const logger = (req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`)
    next()
}

app.use(express.json())
app.use(logger)
app.use('/api/vacations', require('./api/vacations'))

app.get('/', (req, res) => {
    const absPath = path.join(__dirname, 'index.html')
    res.sendFile(absPath)
})

const port = 3000 // process.env.PORT
app.listen(port, () => console.log(`Serving app in port ${port}`))
