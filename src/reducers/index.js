import { combineReducers } from 'redux'
import employees from './employeesReducer'
import employee from './employeeReducer'

export default combineReducers({
  employees,
  employee
})
