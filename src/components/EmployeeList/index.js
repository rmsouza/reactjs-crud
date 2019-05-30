import React, { Component } from 'react'
import { connect } from 'react-redux'

class EmployeeList extends Component {
  render () {
    const { employees } = this.props

    if (employees.length) {
      return (
        <div>
          <h1>Employees List</h1>

          {
            employees.map(employee => {
              return (
                <div key={ employee.id }>
                  <p>{ employee.name }</p>
                </div>
              )
            })
          }
        </div>
      )
    } else {
      return (<h1>No employees</h1>)
    }
  }
}

const mapStateToProps = (state) => ({ employees: state.employees })

export default connect(mapStateToProps)(EmployeeList)