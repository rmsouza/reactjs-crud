const Charlatan = require('charlatan')
const Db = require('../../models')
const db = new Db()
require('../../models/Employees')

module.exports = {
  createOne,
  createMany,
  removeAll,
  generateRandomEmployee
}

async function createOne (options = {}) {
  await db.connect()

  const obj = {
    name: options.name || Charlatan.Name.name(),
    code: options.code || Charlatan.Number.number(4),
    profession: options.profession || Charlatan.Name.name(),
    color: options.color || `#${Charlatan.Number.hexadecimal(6)}`,
    city: options.city || Charlatan.Address.city(),
    branch: options.branch || Charlatan.Name.name(),
    assigned: options.assigned || 0
  }

  await db.create('employees', obj)
  const id = await db.getLastInsertId()
  const employee = db.getOne('employees', { id })

  await db.close()

  return employee
}

async function createMany (number) {
  await db.connect()

  const promises = []
  for (let i = 0; i < number; i++) {
    promises.push(createOne)
  }

  const employees = await Promise.all(promises)

  await db.close()

  return employees
}

function generateRandomEmployee () {
  return {
    name: Charlatan.Name.name(),
    code: Charlatan.Number.number(4),
    profession: Charlatan.Name.name(),
    color: `#${Charlatan.Number.hexadecimal(6)}`,
    city: Charlatan.Address.city(),
    branch: Charlatan.Name.name(),
    assigned: 0
  }
}

async function removeAll () {
  await db.connect()

  const sql = `DELETE FROM employees`
  await db.run(sql)

  await db.close()
}
