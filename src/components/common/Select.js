import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

const Select = ({ name, value, handleChange, label, required, options }) => {
  return (
    (
      <TextField
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        select
        SelectProps={{
          native: true
        }}
        margin="dense"
        variant="outlined"
        className="textField"
        style={styles.textField}
        required={required}
      >
        <option value=""></option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
    )
  )
}

const styles = {
  textField: {
    marginLeft: '5px',
    marginRight: '5px'
  }
}

Select.defaultProps = {
  required: false
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired
}

export default Select