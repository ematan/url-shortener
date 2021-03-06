const urlRouter = require('express').Router()
const DB_url = require('./models/url')
const { nanoid } = require('nanoid')

urlRouter.get('/:url', async (request, response) => {
  const shortened_url = request.params.url
  const url = await DB_url.findOne({ shortened: shortened_url })
  if (url) {
    response.status(302).redirect(url.original)
  }
  else response.status(404).end()
})

urlRouter.post('/', async (req, res) => {
  const body = req.body
  try {
    const origUrl = new URL(body.url)
    const host = req.headers.host
    const protocol = req.protocol
    let unique_shortened
    let result
    do {
      unique_shortened = nanoid(16)
      result = await DB_url.find({ shortened: unique_shortened })
    } while (result.length !== 0)
    const url = new DB_url({
      original: origUrl,
      shortened: unique_shortened
    })
    await url.save()
    res.send(`${protocol}://${host}/${url.shortened}`)
  } catch (error) {
    return res.status(400).send({ error: error })
  }
})

module.exports = urlRouter