const Db = require('../models')
const db = new Db()

module.exports = {
  list,
  get,
  create,
  update,
  remove
}

async function list (req, res) {
  try {
    await db.connect()

    const employees = await db.getAll('employees')

    res.status(200).json({
      employees: employees || []
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  } finally {
    await db.close()
  }
}

async function get (req, res) {
  const id = req.params.id

  try {
    await db.connect()

    const employee = await db.getOne('employees', { id })
    if (!employee) {
      return res.status(404).end()
    }

    res.status(200).json({
      employee
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  } finally {
    await db.close()
  }
}

async function create (req, res) {
  try {
    await db.connect()

    const employee = await db.create('employees', req.body)

    res.status(201).json({
      employee
    })
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  } finally {
    await db.close()
  }
}

async function update (req, res) {
  const body = req.body

  try {
    await db.connect()
    const employee = await db.update('employees', body)

    if (!employee) {
      res.status(404).json({})
    } else {
      res.status(202).json({
        employee
      })
    }
  } catch (err) {
    res.status(400).json({
      error: err.message
    })
  } finally {
    await db.close()
  }
}

async function remove (req, res) {
  const id = req.params.id

  try {
    await db.connect()

    const employee = await db.getOne('employees', { id })
    if (!employee) {
      res.status(404).json({
        message: 'User removed successfully'
      })
    } else {
      await db.deleteOne('employees', id)

      res.status(200).json({
        message: 'User removed successfully'
      })
    }
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  } finally {
    await db.close()
  }
}
