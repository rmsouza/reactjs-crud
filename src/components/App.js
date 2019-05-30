import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import EmployeeForm from './EmployeeForm'
import EmployeeList from './EmployeeList'
import { Router, Route } from 'react-router-dom'
import './App.css'
import history from '../history'

function App() {
  return (
    <div>
      <Header />
      <div className="app">
        <div>
          <Router history={history}>
            <div className="container">
              <Route exact path="/" component={EmployeeList} />
              <Route exact path="/employees/create" component={EmployeeForm} />
              <Route exact path="/employees/:id/edit" component={EmployeeForm} />
            </div>
          </Router>
          
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
