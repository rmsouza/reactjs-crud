import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import history from '../../history'
import { deleteEmployee } from '../../actions'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

class EmployeeList extends Component {
  handleEdit = (employee) => {
    history.push(`/employees/edit?id=${employee.id}`)
  }

  handleDelete = (employee) => {
    this.props.deleteEmployee(employee.id)
  }

  render () {
    const { employees } = this.props

    if (employees.length) {
      return (
        <React.Fragment>
          <Typography variant="h5" component="h3">
            Employees

            <Button variant="contained" color="primary" component={Link} to="/employees/create">
              <AddIcon />
              New Employee
            </Button>
          </Typography>

          <ReactTable
            data={employees}
            columns={[
              { Header: "Name", accessor: "name" },
              { Header: "Code", accessor: "code" },
              { Header: "Profession", accessor: "profession" },
              { Header: "Color", accessor: "color" },
              { Header: "City", accessor: "city" },
              { Header: "Branch", accessor: "branch" },
              {
                Header: '',
                Cell: row => (
                  <div>
                    <button onClick={() => this.handleEdit(row.original)}>Edit</button>
                    <button onClick={() => this.handleDelete(row.original)}>Delete</button>
                  </div>
                )
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
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