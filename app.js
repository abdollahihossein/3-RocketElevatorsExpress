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
      res.json({
        region: `${region}`,
        average_rating: `${avgRating.toFixed(2)}`,
        average_fee: `${avgFee.toFixed(2)}`})
    }    
  })
})

// calc-residential
app.get('/calc-residential', (req, res) => {
  let numberOfApartments = req.query.numberOfApartments
  let numberOfFloors = req.query.numberOfFloors
  let tier = req.query.tier
  let numberOfBanks = Math.ceil(numberOfFloors/20)
  let numberOfApartPerFloor = Math.ceil(numberOfApartments/numberOfFloors)
  let numberOfElevators = numberOfBanks * Math.ceil(numberOfApartPerFloor/6)
  if (tier == 'standard') {
    unitPrice = 8000
    percentage = 0.1
  }
  else if (tier == 'premium') {
      unitPrice = 12000
      percentage = 0.15
  }
  else if (tier == 'excelium') {
      unitPrice = 15000
      percentage = 0.2
  }
  let installationFee = percentage * numberOfElevators * unitPrice
  let finalCost = installationFee + numberOfElevators * unitPrice
  res.json({
    number_of_elevators_required: `${numberOfElevators}`,
    total_cost: `${finalCost}`
  })
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
