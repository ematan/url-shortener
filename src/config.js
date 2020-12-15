const dotenvExpand = require('dotenv-expand')
const myEnv = require('dotenv').config()
dotenvExpand(myEnv)

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let RUN_MODE = 'PRODUCTION'

if (process.env.NODE_ENV === 'test'){
  MONGODB_URI = process.env.TEST_MONGODB_URI
  RUN_MODE = 'TEST'
}
/*if (process.env.NODE_ENV === 'dev'){
  MONGODB_URI = process.env.DEV_MONGODB_URI
}*/

module.exports = {
  PORT,
  MONGODB_URI,
  RUN_MODE
}