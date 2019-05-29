const Db = require('../models')
const db = new Db()

module.exports = {
  get,
  create
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
