import {
  RECEIVE_EMPLOYEES,
  CREATE_EMPLOYEE,
  REMOVE_EMPLOYEE,
  UPDATE_EMPLOYEE
} from '../actions'

const initialState = { employees: [] }

export default function employeesReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEES:
      return action.employees
    case CREATE_EMPLOYEE:
      return [action.payload, ...state]
    case REMOVE_EMPLOYEE:
      return state.filter(employee => employee.id !== action.payload.id)
    case UPDATE_EMPLOYEE:
      return state.map((employee) => {
        if (employee.id === action.payload.id) {
          return action.payload
        }
        return employee
      })
    default:
      return state
  }
}
