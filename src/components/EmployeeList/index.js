import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'
import history from '../../history'
import { deleteEmployee } from '../../actions'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

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
              { Header: 'Name', accessor: 'name' },
              { Header: 'Code', accessor: 'code' },
              { Header: 'Profession', accessor: 'profession' },
              { Header: 'Color', accessor: 'color' },
              { Header: 'City', accessor: 'city' },
              { Header: 'Branch', accessor: 'branch' },
              {
                Header: 'Assigned',
                className: 'align-center',
                Cell: row => (
                  <div>
                    { row.original.assigned ? 'Yes' : 'No' }
                  </div>
                )
              },
              {
                Header: '',
                Cell: row => (
                  <div className="col-options">
                    <IconButton aria-label="Edit" onClick={() => this.handleEdit(row.original)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.handleDelete(row.original)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
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