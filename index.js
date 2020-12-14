const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const config = require('./config')
const urlRouter = require('./router')


mongoose.connect(config.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

app.get('/favicon.ico', (req, res) => res.status(204))
app.use('', urlRouter)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})