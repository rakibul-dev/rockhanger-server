const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const fs = require('fs')

require('dotenv').config()

var corsOptions = {
  origin: `${process.env.CORS}`,
  origin: `*`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//app
const app = express()
// app.use(cors(corsOptions))
//database connection
mongoose
  .connect(process.env.DATABASE)
  .then(console.log('Database connected with srver successfully...'))
  .catch((error) => {
    console.log(error)
  })

//middlewares

app.use(cors())

app.use(morgan('tiny'))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.send('hello world')
})

const UserRoute = require('./Routes/UserRoute')
const ProductCategoryRoute = require('./Routes/ProductCategoryRoute')
const ProductRoute = require('./Routes/ProductRoute')
const Order = require('./Routes/Orders')
app.use(UserRoute)
app.use(ProductCategoryRoute)
app.use(ProductRoute)
app.use(Order)
//port
const port = process.env.PORT
//server request
app.listen(port, () =>
  console.log(`server is running on port ${port} sucessfully...`),
)
