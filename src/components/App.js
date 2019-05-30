import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import EmployeeForm from './EmployeeForm'
import EmployeeList from './EmployeeList'
import Paper from '@material-ui/core/Paper'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="app">
      <div>
        <Header />
          <Router>
            <Navigation />
            <Paper className="container">
              <Route exact path="/" component={EmployeeList} />
              <Route path="/employees/create" component={EmployeeForm} />
            </Paper>
          </Router>
        <Footer />
      </div>
    </div>
  )
}

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><Link className="nav-link" to="/">Employees</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/employees/create">Create Employee</Link></li>
    </ul>
  </nav>
)

export default App
