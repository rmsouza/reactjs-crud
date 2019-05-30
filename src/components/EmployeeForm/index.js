import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import SubHeader from './SubHeader'
import Input from '../common/Input'
import Select from '../common/Select'
import SwitchButton from '../common/SwitchButton'
import history from '../../history'
import './style.css'
import { createEmployee, getEmployee, updateEmployee, clearEmployee } from '../../actions'

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
      employee.assigned = employee.assigned === 1 ? true : false
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

  handleCancel = () => {
    this.props.clearEmployee()

    history.push('/')
  }

  render() {
    let { employee } = this.state

    return (
      <React.Fragment>
        <SubHeader />

        <Paper className="panel">
          <form
            onSubmit={this.handleSubmit}
            autoComplete="off">

            <div className="form-row">
              <Input name="name" label="Name" value={employee.name} required={true} handleChange={this.handleChange} />
              <Input name="code" label="Code" value={employee.code} required={true} handleChange={this.handleChange} />
            </div>

            <div className="form-row">
              <Input name="profession" label="Profession" value={employee.profession} handleChange={this.handleChange} />
              <Input name="color" label="Color" value={employee.color} handleChange={this.handleChange} />
            </div>

            <div className="form-row">
              <Select name="city" label="City" value={employee.city} options={cities} handleChange={this.handleChange} />      
              <Input name="branch" label="Branch" value={employee.branch} handleChange={this.handleChange} />
            </div>

            <div className="form-row">
              <SwitchButton name="assigned" label="Assigned" value={employee.assigned} handleChange={this.handleCheckboxChange} />
            </div>

            <div className="form-actions-row">
              <Button variant="outlined" className="button" onClick={this.handleCancel} >Cancel</Button>
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
        </Paper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({ employee: state.employee })
const mapDispatchToProps = { createEmployee, getEmployee, updateEmployee, clearEmployee }

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm)