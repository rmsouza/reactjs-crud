const request = require('supertest')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const dirtyChai = require('dirty-chai')
chai.use(chaiAsPromised)
chai.use(dirtyChai)
const expect = chai.expect
const app = require('../../index')
const EmployeeBuilder = require('../data_builders/employee.builder')

const ROUTE_BASE = '/api/employees'

describe('Employees', () => {
  beforeEach(async () => {
    await EmployeeBuilder.removeAll()
  })

  describe(`GET ${ROUTE_BASE}/:id`, () => {
    let employee

    beforeEach(async () => {
      employee = await EmployeeBuilder.createOne()
    })

    describe('Get employee', () => {
      describe('when the provided id exist', () => {
        it('should return employee data', done => {
          console.log(request)
          request(app)
            .get(`${ROUTE_BASE}/${employee.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              expect(err).to.be.equal(null)

              expect(res.body.employee).to.be.an('object')
              expect(`${res.body.employee.id}`).to.be.equal(`${employee.id}`)
              expect(res.body.employee.name).to.be.equal(employee.name)
              expect(res.body.employee.code).to.be.equal(employee.code)
              expect(res.body.employee.profession).to.be.equal(employee.profession)
              expect(res.body.employee.color).to.be.equal(employee.color)
              expect(res.body.employee.city).to.be.equal(employee.city)
              expect(res.body.employee.branch).to.be.equal(employee.branch)
              expect(res.body.employee.assigned).to.be.equal(employee.assigned)
              done()
            })
        })
      })

      describe('when a non existent id is provided', () => {
        it('should return NOT FOUND', done => {
          const id = 2
          request(app)
            .get(`${ROUTE_BASE}/${id}`)
            .set('Accept', 'application/json')
            .expect(404, done)
        })
      })
    })
  })

  describe(`POST ${ROUTE_BASE}`, () => {
    describe('Create employee', () => {
      describe('when a valid employee data are provided', () => {
        it('should create a new employee', done => {
          const body = EmployeeBuilder.generateRandomEmployee()

          request(app)
            .post(`${ROUTE_BASE}`)
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
              expect(err).to.be.equal(null)

              expect(res.body.employee.name).to.be.equal(body.name)
              expect(res.body.employee.code).to.be.equal(body.code)
              expect(res.body.employee.profession).to.be.equal(body.profession)
              expect(res.body.employee.color).to.be.equal(body.color)
              expect(res.body.employee.city).to.be.equal(body.city)
              expect(res.body.employee.branch).to.be.equal(body.branch)
              expect(res.body.employee.assigned).to.be.equal(body.assigned)
              done()
            })
        })
      })

      describe('when the name provided is empty', () => {
        it('should reject', done => {
          const body = EmployeeBuilder.generateRandomEmployee()
          body.name = ''

          request(app)
            .post(`${ROUTE_BASE}`)
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
        })
      })
    })
  })

  describe(`PUT ${ROUTE_BASE}`, () => {
    let employee

    beforeEach(async () => {
      employee = await EmployeeBuilder.createOne()
    })

    describe('Update employee', () => {
      describe('when a valid data are provided', () => {
        it('should update the employee', done => {
          const body = {
            id: employee.id,
            name: 'Steve',
            code: 'XYZ'
          }

          request(app)
            .put(`${ROUTE_BASE}`)
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(202)
            .end((err, res) => {
              expect(err).to.be.equal(null)

              expect(res.body.employee.name).to.be.equal(body.name)
              expect(res.body.employee.code).to.be.equal(body.code)
              done()
            })
        })
      })

      describe('when a invalid name is provided', () => {
        it('should reject', done => {
          const body = {
            id: employee.id,
            name: ''
          }

          request(app)
            .put(`${ROUTE_BASE}`)
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
        })
      })

      describe('when an unexistent employee id is provided', () => {
        it('should reject', done => {
          const body = {
            id: '123',
            name: 'Steve',
            code: 'XYZ'
          }

          request(app)
            .put(`${ROUTE_BASE}`)
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done)
        })
      })
    })
  })
})