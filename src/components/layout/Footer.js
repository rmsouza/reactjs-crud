import React from 'react'
import Typography from '@material-ui/core/Typography'

function Footer () {
  return (
    <div>
      <Typography style={ styles.title } variant="subtitle2" component="h1">
        Made with ❤ by Rafael de Souza
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

export default Footer