import { RECEIVE_EMPLOYEES, CREATE_EMPLOYEE } from '../actions'

const initialState = { employees: [] }

export default function employeesReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEES:
      return action.employees
    case CREATE_EMPLOYEE:
      return [action.payload, ...state]
    default:
      return state
  }
}