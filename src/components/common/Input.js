import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const Input = ({ name, value, handleChange, label, required }) => {
  return (
    (
      <TextField
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        className="textField"
        variant="outlined"
        margin="dense"
        style={styles.textField}
        required={required}
      />
    )
  )
}

const styles = {
  textField: {
    marginLeft: '5px',
    marginRight: '5px'
  }
}

Input.defaultProps = {
  required: false
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool
}

export default Input