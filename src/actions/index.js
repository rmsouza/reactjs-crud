import axios from 'axios'

export const GET_EMPLOYEES = 'GET_EMPLOYEES'
export const REQUEST_EMPLOYEES = 'REQUEST_EMPLOYEES'
export const RECEIVE_EMPLOYEES = 'RECEIVE_EMPLOYEES'
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const RECEIVE_EMPLOYEE = 'RECEIVE_EMPLOYEE'

const apiUrl = 'http://localhost:8080/api/employees'

export const createEmployee = (employee) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${apiUrl}`, employee)
      await dispatch({ type: CREATE_EMPLOYEE, payload: response.data.employee })
    } catch (err) {
      throw (err)
    }
  }
}

export const getEmployees = () => {
  return async (dispatch) => {
    try {
      await dispatch(requestEmployees())

      const response = await axios.get(`${apiUrl}`)
      await dispatch(receiveEmployees(response.data.employees))
    } catch (err) {
      throw (err)
    }
  }
}

const receiveEmployees = (employees) => {
  return {
    type: RECEIVE_EMPLOYEES,
    employees
  }
}

const requestEmployees = () => {
  return {
    type: REQUEST_EMPLOYEES
  }
}