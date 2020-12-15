const mongoose = require('mongoose')
const supertest = require('supertest')
const DB_url = require('../src/models/url')
const app = require('../src/app')
const initialUrls = require('./data')

const api = supertest(app)


beforeEach(async () => {
  await DB_url.deleteMany({})
  const urlObjects = initialUrls.map(u => new DB_url(u))
  const promiseArray = urlObjects.map(u => u.save())
  await Promise.all(promiseArray)
})

describe('GET endpoint', () => {
  test('Api redirects to correct original url', async () => {
    const result = await api
      .get(`/${initialUrls[0].shortened}`)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
    expect(result.header.location).toBe(initialUrls[0].original)
    expect(result.text).toBe(`Found. Redirecting to ${initialUrls[0].original}`)
  })
  test('Api returns 404 if url not in db', async () => {
    await api
      .get('/123456789abcdefg')
      .expect(404)
    await api
      .get(`/${initialUrls[0].shortened.slice(1)}`)
      .expect(404)
  })
})

describe('POST endpoint', () => {
  test('passes with most common uri format', async () => {
    const data1 = { url:'https://stackoverflow.com/questions/9954794' }
    const data2 = { url: 'ftp://something' }
    await api
      .post('/')
      .send(data1)
      .expect(200)
      .expect('Content-Type', /text\/html/)
    await api
      .post('/')
      .send(data2)
      .expect(200)
      .expect('Content-Type', /text\/html/)
  })
  test('throws error if bad format in uri', async () => {
    const data = { url:'stackoverflow.com/questions/9954794' }
    await api
      .post('/')
      .send(data)
      .expect(400)
  })
  test('return value can be used to GET original url', async () => {
    const data = { url:'ftp://stackoverflow.com/' }
    const postResult = await api
      .post('/')
      .send(data)
      .expect(200)
      .expect('Content-Type', /text\/html/)
    const short = postResult.text.slice(-16)
    const result = await api
      .get(`/${short}`)
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
    expect(result.header.location).toBe(data.url)
    expect(result.text).toBe(`Found. Redirecting to ${data.url}`)
  })
})



afterAll(() => {
  mongoose.connection.close()
})