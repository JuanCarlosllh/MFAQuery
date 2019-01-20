const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
const config = require('./config')
const middleware = require('./middleware')
const api = require('./api')

let app = express()
app.server = http.createServer(app)

app.use(bodyParser.json())

app.use(middleware({ config }))
app.use('/', api({ config }))
app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`)
})
