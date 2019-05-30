import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import EmployeeForm from './EmployeeForm'
import EmployeeList from './EmployeeList'
import Paper from '@material-ui/core/Paper'
import { Router, Route, Link } from 'react-router-dom'
import './App.css'
import history from '../history'

function App() {
  return (
    <div className="app">
      <div>
        <Header />
          <Router history={history}>
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

export default App
