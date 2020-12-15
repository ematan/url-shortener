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
  test('Api returns correct original url', async () => {
    const result = await api
      .get(`/${initialUrls[0].shortened}`)
      .expect(200)
      .expect('Content-Type', /text\/html/)
    expect(result.text).toBe(initialUrls[0].original)
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
    const shortened = await api
      .post('/')
      .send(data)
      .expect(200)
      .expect('Content-Type', /text\/html/)
    const result = await api
      .get(`/${shortened.text}`)
      .expect(200)
      .expect('Content-Type', /text\/html/)
    expect(result.text).toBe(data.url)
  })
})



afterAll(() => {
  mongoose.connection.close()
})