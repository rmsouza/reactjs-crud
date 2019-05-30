import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

const Table = ({ employees, handleEdit, handleDelete }) => {
  return (
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
              {row.original.assigned ? 'Yes' : 'No'}
            </div>
          )
        },
        {
          Header: '',
          Cell: row => (
            <div className="col-options">
              <IconButton aria-label="Edit" onClick={() => handleEdit(row.original)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="Delete" onClick={() => handleDelete(row.original)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          )
        }
      ]}
      defaultPageSize={10}
      className="-striped -highlight"
    />
  )
}

Table.propTypes = {
  employees: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Table