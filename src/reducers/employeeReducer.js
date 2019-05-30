import { RECEIVE_EMPLOYEE, UPDATE_EMPLOYEE } from '../actions'

export default function employeeReducer (state = {}, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEE:
      return action.payload
    case UPDATE_EMPLOYEE:
      return {}
    default:
      return state
  }
}
