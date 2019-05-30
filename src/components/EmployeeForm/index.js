import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'
import './style.css'
import { createEmployee, getEmployee, updateEmployee } from '../../actions'

const cities = ['Toronto', 'Brampton', 'Mississauga', 'Hamilton']

class EmployeeForm extends Component {
  state = {
    employee: {
      id: '',
      name: '',
      code: '',
      profession: '',
      color: '',
      city: '',
      branch: '',
      assigned: true
    },
    submitted: false
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getEmployee(this.props.match.params.id)
    }
  }

  componentDidUpdate() {
    const { employee } = this.props
    if (employee.id && this.state.employee.id === '') {
      employee.assigned = employee.assigned === '1' ? true : false
      this.setState({ employee: employee })
    }
  }
  
  handleChange = (e) => {
    const employee = this.state.employee
    employee[e.target.name] = e.target.value
    this.setState({ employee })
  };

  handleCheckboxChange = (e) => {
    const employee = this.state.employee
    employee[e.target.name] = e.target.checked
    this.setState({ employee })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ submitted: true })

    if (this.state.employee.id === '') {
      this.props.createEmployee(this.state.employee)
    } else {
      this.props.updateEmployee(this.state.employee)
    }
  }

  render() {
    let { employee } = this.state

    return (
      <React.Fragment>
        <Typography style={styles.title} variant="h5" component="h3">
          Creating Employee
        </Typography>

        <Divider style={styles.divider}/>

        <form
          onSubmit={this.handleSubmit}
          autoComplete="off">

          <div className="form-row">
            <TextField
              id="name"
              name="name"
              label="Name"
              value={employee.name}
              onChange={this.handleChange}
              className="textField"
              variant="outlined"
              margin="dense"
              style={styles.textField}
              required={true}
            />

            <TextField
              id="code"
              name="code"
              label="Code"
              value={employee.code}
              onChange={this.handleChange}
              className="textField"
              variant="outlined"
              margin="dense"
              style={styles.textField}
              required={true}
            />
          </div>

          <div className="form-row">
            <TextField
              id="profession"
              name="profession"
              label="Profession"
              value={employee.profession}
              onChange={this.handleChange}
              className="textField"
              variant="outlined"
              margin="dense"
              style={styles.textField}
            />

            <TextField
              id="color"
              name="color"
              label="Color"
              value={employee.color}
              onChange={this.handleChange}
              className="textField"
              variant="outlined"
              margin="dense"
              style={styles.textField}
            />
          </div>

          <div className="form-row">
            <TextField
              id="city"
              name="city"
              select
              label="City"
              value={employee.city}
              onChange={this.handleChange}
              SelectProps={{
                native: true
              }}
              margin="dense"
              variant="outlined"
              className="textField"
              style={styles.textField}
            >
              <option value=""></option>
              {cities.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>

            <TextField
              id="branch"
              name="branch"
              label="Branch"
              value={employee.branch}
              onChange={this.handleChange}
              className="textField"
              variant="outlined"
              margin="dense"
              style={styles.textField}
            />
          </div>

          <div className="form-row">
            <FormControlLabel
              className="switch"
              control={
                <Switch
                  name="assigned"
                  checked={employee.assigned}
                  onChange={this.handleCheckboxChange}
                  value={employee.assigned} />
              }
              label="Assigned"
            />
          </div>

          <div className="form-actions-row">
            <Button variant="outlined" className="button" component={Link} to="/" >Cancel</Button>
            <Button 
              type="submit"
              variant="contained"
              className="button"
              disabled={this.state.submitted}
              color="primary">
              Save
            </Button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

const styles = {
  textField: {
    marginLeft: '5px',
    marginRight: '5px'
  },
  title: {
    margin: '5px 5px'
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px'
  }
}

const mapStateToProps = (state) => ({ employee: state.employee })
const mapDispatchToProps = { createEmployee, getEmployee, updateEmployee }

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm)