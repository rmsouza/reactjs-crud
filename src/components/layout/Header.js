import React from 'react'
import Typography from '@material-ui/core/Typography'

function Header () {
  return (
    <div>
      <Typography style={ styles.title } variant="h3" component="h3">
        Employees Super System
      </Typography>
    </div>
  )
}

const styles = {
  title: {
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '20px'
  }
}

export default Header