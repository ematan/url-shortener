const urlRouter = require('express').Router()
const DB_url = require('./models/url')
const { nanoid } = require('nanoid')


urlRouter.get('/:url', async (request, response) => {
  const shortened_url = request.params.url
  const url = await DB_url.findOne({ shortened: shortened_url })
  if (url) {
    console.log(url)
    response.send(url.original)
  }
  else response.status(404).end()
})

urlRouter.post('/', async (req, res) => {
  const body = req.body
  try {
    const origUrl = new URL(body.url)
    const url = new DB_url({
      original: origUrl,
      shortened: nanoid(16)
    })
    await url.save()
    res.send(url)
  } catch (error) {
    return res.status(400).send({ error: 'invalid URL' })
  }
})

module.exports = urlRouter