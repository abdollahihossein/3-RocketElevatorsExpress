const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

app.listen(port, () => {
   console.clear()
   console.log(`Server listening on port ${port} `)
 })

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
