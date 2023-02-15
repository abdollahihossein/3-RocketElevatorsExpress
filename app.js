const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

// hello
app.get('/hello', (req,res) => {
  res.send('Hello World!')
  console.log(`Port in use is: ${port}`)
})

// status
app.get('/status', (req,res) => {
  res.send(`The Environment Name: ${process.env.NAME} - Port Number: ${process.env.PORT}`)
})

// error
app.get('/error', (req, res) => {
  const error = new Error("Error Message")
  error.status = 403
  res.status(error.status).send(`Something goes wrong! - Error code: ${error.status}`)
})

// email-list



app.listen(port, () => {
  console.clear()
  console.log(`Server listening on port ${port} `)
})
