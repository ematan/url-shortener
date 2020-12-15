const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')
const urlRouter = require('./router')

mongoose.connect(config.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

app.use(express.json())
app.get('/favicon.ico', (req, res) => res.status(204))
app.use('', urlRouter)

module.exports = app