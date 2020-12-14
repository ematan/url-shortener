const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  shortened: { type: String, unique: true, required: true },
  original: { type: String, required: true }
}, { timestamps: true })

urlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

urlSchema.index({ createdAt:1 }, { expires: '1m' })

module.exports = mongoose.model('DB_url', urlSchema)