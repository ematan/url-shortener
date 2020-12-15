//const mongoose = require('mongoose')
const DB_url = require('../src/models/url')
const { nanoid } = require('nanoid')

const testUrl = 'https://stackoverflow.com/'

describe('DB_url', () => {
  const shortenedUrl = nanoid(16)
  const url = new DB_url({
    original: testUrl,
    shortened: shortenedUrl })

  test('has correct form', () => {
    expect(url.original).toEqual(testUrl)
    expect(url.shortened).toEqual(shortenedUrl)
    expect(url.id).toEqual(expect.any(String))
  })

  test('toJSON removes _id and __v fields', () => {
    expect(url).toHaveProperty('_id')
    expect(url).toHaveProperty('__v')
    expect(url.toJSON()).not.toHaveProperty('_id')
    expect(url.toJSON()).not.toHaveProperty('__v')
  })


})