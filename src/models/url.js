const mongoose = require('mongoose')
const config = require('../config')

const urlSchema = new mongoose.Schema({
  shortened: {
    type: String,
    unique: true,
    required: true,
  },
  original: { type: String, required: true }
}, { timestamps: true })

urlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const timeLimit = config.RUN_MODE === 'TEST'? 60 : 60*60*24*7
//console.log(timeLimit)

urlSchema.index({ createdAt:1 }, { expireAfterSeconds: timeLimit })

module.exports = mongoose.model('DB_url', urlSchema)