const express = require('express')
const app = express()

let urls = [
  {
    id: 1,
    shortened: 'abcdef',
    original: 'https://fullstackopen.com/',
    createdAt: 2020
  },
  {
    id: 1,
    shortened: 'ghijk',
    original: 'https://www.google.com/',
    createdAt: 2020
  }
]

app.get('/:url', async (request, response) => {
  const shortened_url = request.params.url
  const url = await urls.find(u => u.shortened == shortened_url)
  console.log(url)
  response.send(url.original)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})