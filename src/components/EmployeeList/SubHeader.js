import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import './style.css'

const SubHeader = () => {
  return (
    <div className="sub-header">
      <Typography variant="h4" component="h4">
        Employees
      </Typography>
      <div className="buttons">
        <Fab variant="extended" color="primary" component={Link} to="/employees/create">
          <AddIcon />
          Create
        </Fab>
      </div>
    </div>
  )
}

export default SubHeader