const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
const config = require('./config')
const initializeDb = require('./db')
const middleware = require('./middleware')
const api = require('./api')

let app = express()
app.server = http.createServer(app)

app.use(bodyParser.json())

initializeDb(db => {
  app.use(middleware({ config, db }))
  app.use('/', api({ config, db }))
  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`)
  })
})
