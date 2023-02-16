const express = require('express')
const app = express()
const fs = require('fs')
require('dotenv').config()
const port = process.env.PORT || 3000
let agents
let j

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
  fs.readFile('agents.json', (err, data) => {
    if (err) throw err
    agents = JSON.parse(data)
    j = 0
    agents.forEach(element => {
      emaillist[j] = element.email
      j++
    });
    res.send(JSON.stringify(emaillist))
  })
})

// region-avg
app.get('/region-avg', (req, res) => {
  let region = req.query.region
  fs.readFile('agents.json', (err, data) => {
    if (err) throw err
    agents = JSON.parse(data)
    let sumRating = 0
    let sumFee = 0
    j = 0
    agents.forEach(element => {
      if (element.region == region) {
        sumRating += parseInt(element.rating)
        sumFee += parseInt(element.fee)
        j++
      }
    })
    if (j == 0) {
      res.send(`No agents found in region ${region}`)
    }
    else {
      let avgRating = sumRating/j
      let avgFee = sumFee/j
      res.send(`The average rating is ${avgRating.toFixed(2)} and the average fee is ${avgFee.toFixed(2)} for agents in the region ${region}`)
    }    
  })
})


app.listen(port, () => {
  console.clear()
  console.log(`Server listening on port ${port} `)
})
