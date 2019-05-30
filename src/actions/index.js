import axios from 'axios'
import history from '../history'

export const GET_EMPLOYEES = 'GET_EMPLOYEES'
export const RECEIVE_EMPLOYEES = 'RECEIVE_EMPLOYEES'
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const RECEIVE_EMPLOYEE = 'RECEIVE_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE'
export const CLEAR_EMPLOYEE = 'CLEAR_EMPLOYEE'

const apiUrl = 'http://localhost:8080/api/employees'

export const createEmployee = (employee) => {
  return async (dispatch) => {
    try {
      delete employee.id
      const response = await axios.post(`${apiUrl}`, employee)
      await dispatch({ type: CREATE_EMPLOYEE, payload: response.data.employee })

      history.push('/')
    } catch (err) {
      throw (err)
    }
  }
}

export const getEmployees = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}`)
      await dispatch(receiveEmployees(response.data.employees))
    } catch (err) {
      throw (err)
    }
  }
}

export const getEmployee = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`)
      await dispatch({ type: RECEIVE_EMPLOYEE, payload: response.data.employee })
    } catch (err) {
      throw (err)
    }
  }
}

export const updateEmployee = (employee) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${apiUrl}`, employee)
      await dispatch({ type: UPDATE_EMPLOYEE, payload: response.data.employee })
      await dispatch({ type: CLEAR_EMPLOYEE, payload: {} })

      history.push('/')
    } catch (err) {
      throw (err)
    }
  }
}

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      await dispatch({ type: REMOVE_EMPLOYEE, payload: { id } })
    } catch (err) {
      throw (err)
    }
  }
}

export const clearEmployee = () => {
  return async (dispatch) => {
    try {
      await dispatch({ type: CLEAR_EMPLOYEE, payload: {} })
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
