const express = require('express')
const EmployeeController = require('../controllers/EmployeeController')
const validateEmployee = require('../middlewares/validateEmployee')

const router = express.Router()

router.get('/',
  EmployeeController.list
)

router.get('/:id',
  EmployeeController.get
)

router.post('/',
  validateEmployee,
  EmployeeController.create
)

router.put('/',
  validateEmployee,
  EmployeeController.update
)

router.delete('/:id',
  EmployeeController.remove
)

module.exports = router
