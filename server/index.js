const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
require('./models/Employees')

const corsOptions = {
  origin: '*', // Just in order to allow API tests from postman or curl for instance
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/api/employees', require('./routes/employees'))

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))

module.exports = app
