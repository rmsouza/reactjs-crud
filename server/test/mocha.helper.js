global.request = require('supertest')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const dirtyChai = require('dirty-chai')

chai.use(chaiAsPromised)
chai.use(dirtyChai)
global.expect = chai.expect
global.app = require('../index')
