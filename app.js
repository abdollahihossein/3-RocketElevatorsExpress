const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const data = require('./data')
const calcResidential = require('./calculationResidential')

// hello 
app.get('/hello', (req,res) => {
  res.send('Hello World!')
  console.log(`Port in use: ${port}`)
})

// status
app.get('/status', (req,res) => {
  res.send(`The Environment Name: ${process.env.NODE_ENV} - Port Number: ${process.env.PORT}`)
})

// error
app.get('/error', (req, res) => {
  const error = new Error("Error Message")
  error.status = 404
  error.message = 'Not Found'
  res.status(error.status)
  res.send(`Something goes wrong! - Error code: ${error.status} - Error message: ${error.message}`)
})

// email-list
app.get('/email-list', (req, res) => {
  let emaillist = []
  let j = 0
  data.agents.forEach(element => {
    emaillist[j] = element.email
    j++
  })
  res.send(JSON.stringify(emaillist))
})

// region-avg
app.get('/region-avg', (req, res) => {
  let region = req.query.region
  let sumRating = 0
  let sumFee = 0
  let j = 0
  data.agents.forEach(element => {
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
    res.json({
      region: `${region}`,
      average_rating: `${avgRating.toFixed(2)}`,
      average_fee: `${avgFee.toFixed(2)}`})
  }
})

// calc-residential
app.get('/calc-residential', (req, res) => {
  let numberOfApartments = req.query.numberOfApartments
  let numberOfFloors = req.query.numberOfFloors
  let tier = req.query.tier
  calcResidential(numberOfApartments, numberOfFloors, tier, res)
})

// contact-us
app.use(express.json()) // This code enales us to read request body data 
app.post('/contact-us', (req, res) => {
  console.log(req.body)
  res.send(`A message was received from ${req.body.first_name} ${req.body.last_name}`)
})

app.listen(port, () => {
  console.clear()
  console.log(`Server listening on port ${port} `)
})
