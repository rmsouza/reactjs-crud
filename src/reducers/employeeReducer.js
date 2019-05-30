import { RECEIVE_EMPLOYEE } from '../actions'

export default function employeeReducer (state = {}, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEE:
      return action.employee
    default:
      return state
  }
}
