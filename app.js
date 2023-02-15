const express = require('express')
const app = express()
const fs = require('fs');
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
  error.status = 404
  res.status(error.status).send(`Something goes wrong! - Error code: ${error.status}`)
})

// email-list
app.get('/email-list', (req, res) => {
  let emaillist =[]
  let agents
  let j
  fs.readFile('agents.json', (err, data) => {
    if (err) throw err
    agents = JSON.parse(data)
    j = 0
    agents.forEach(element => {
      emaillist[j] = agents[j].email
      j++
    });
    res.send(JSON.stringify(emaillist))
  })
})





app.listen(port, () => {
  console.clear()
  console.log(`Server listening on port ${port} `)
})
