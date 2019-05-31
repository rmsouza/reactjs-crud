import React from 'react'
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const SwitchButton = ({ name, value, handleChange, label }) => {
  return (
    <FormControlLabel
      className="switch"
      control={
        <Switch
          name={name}
          checked={value}
          onChange={handleChange}
          value={value} />
      }
      label={label}
    />
  )
}

SwitchButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string
}

export default SwitchButton