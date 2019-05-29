const Db = require('../models')

const db = new Db()

async function createTable () {
  await db.connect()

  let sql = `CREATE TABLE IF NOT EXISTS employees ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    name TEXT NOT NULL, \
    code TEXT NOT NULL, \
    profession TEXT, \
    color TEXT, \
    city TEXT, \
    branch TEXT, \
    assigned BOOLEAN NOT NULL CHECK (assigned IN (0,1)) \
  )`
  await db.run(sql)

  db.close()
}

createTable()
