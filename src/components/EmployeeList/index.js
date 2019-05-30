import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import history from '../../history'
import { deleteEmployee } from '../../actions'
import SubHeader from './SubHeader'
import Table from './Table'

class EmployeeList extends Component {
  handleEdit = (employee) => {
    history.push(`/employees/${employee.id}/edit`)
  }

  handleDelete = (employee) => {
    this.props.deleteEmployee(employee.id)
  }

  render () {
    const { employees } = this.props

    if (employees.length) {
      return (
        <React.Fragment>
          <SubHeader />

          <Paper className="panel">
            <Table employees={employees} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
          </Paper>
        </React.Fragment>
      )  
    } else {
      return (<React.Fragment />)
    }
    
  }
}

const mapStateToProps = (state) => ({ employees: state.employees })
const mapDispatchToProps = { deleteEmployee }

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)