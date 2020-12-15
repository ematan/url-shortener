const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app')
const initialUrls = require('./data')
const api = supertest(app)

describe('TTL', () => {
  test('urls have 60s expiration time',async () => {
    await api
      .get(`/${initialUrls[0].shortened}`)
      .expect(404)

  })
})

afterAll(() => {
  mongoose.connection.close()
})