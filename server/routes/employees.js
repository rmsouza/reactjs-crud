const express = require('express')
const EmployeeController = require('../controllers/EmployeeController')
const validateEmployee = require('../middlewares/validateEmployee')

const router = express.Router()

router.get('/:id',
  EmployeeController.get
)

router.post('/',
  validateEmployee,
  EmployeeController.create
)

module.exports = router
