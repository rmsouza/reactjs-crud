import { RECEIVE_EMPLOYEE, CLEAR_EMPLOYEE } from '../actions'

export default function employeeReducer (state = {}, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEE:
      return action.payload
    case CLEAR_EMPLOYEE:
      return {}
    default:
      return state
  }
}
