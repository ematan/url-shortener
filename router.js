const urlRouter = require('express').Router()
const DB_url = require('./models/url')
const { nanoid } = require('nanoid')

const createPost = (origUrl) => {
  const id = nanoid(16)
  const body = {
    original: origUrl,
    shortened: id
  }
  return new DB_url(body)
}


urlRouter.get('/:url', async (request, response) => {
  const shortened_url = request.params.url
  const url = await DB_url.findOne({shortened: shortened_url})
  if (url) {
    console.log(url)
    response.send(url.original)
  }
  else reponse.status(404).end()
})

urlRouter.post('/', async (req, res) => {
  const body = req.body
  const url = createPost(body.url)
  await url.save()
  res.send(url)
})

module.exports = urlRouter