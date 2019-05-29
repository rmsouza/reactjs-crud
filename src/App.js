import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import EmployeesForm from './components/EmployeeForm'
import Paper from '@material-ui/core/Paper'
import './App.css'

function App() {
  return (
    <div className="app">
      <div>
        <Header />
        <Paper className="container">
          <Router>
            <Route exact path="/" component={EmployeesForm} />
            {/* <Route path="/employees" component={Employees} /> */}
          </Router>
        </Paper>
        <Footer />
      </div>
    </div>
  )
}

export default App
