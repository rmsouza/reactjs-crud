const sqlite3 = require('sqlite3').verbose()
const { DB_NAME } = require('../config/env')

module.exports = class {
  constructor () {
    this.db = null
  }

  async connect () {
    this.db = await new Promise((resolve, reject) => {
      const db = new sqlite3.Database(`./server/db/${DB_NAME}`, (err) => {
        if (err) {
          return reject(err)
        }
        return resolve(db)
      })
    })
  }

  run (sql) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, [], (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

  create (table, obj) {
    if (typeof obj !== 'object' || typeof table !== 'string') {
      return Promise.reject(Error('A valid object and table name should be provided'))
    }

    const columns = Object.keys(obj).join(',')
    const values = Object.values(obj)
    const placeholders = values.map(value => '?').join(',')

    const sql = `INSERT INTO ${table}(${columns}) VALUES (${placeholders})`

    return new Promise((resolve, reject) => {
      this.db.run(sql, values, (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

  getOne (table, obj) {
    if (typeof obj !== 'object' || typeof table !== 'string') {
      return Promise.reject(Error('A valid object and table name should be provided'))
    }

    const where = Object.keys(obj).map(key => `${key} = ?`).join(' AND ')
    const sql = `SELECT * FROM ${table} WHERE ${where}`
    const values = Object.values(obj)

    return new Promise((resolve, reject) => {
      this.db.get(sql, values, (err, row) => {
        if (err) {
          return reject(err)
        }
        return resolve(row)
      })
    })
  }

  getLastInsertId () {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT last_insert_rowid() id', [], (err, rows) => {
        if (err) {
          return reject(err)
        }
        return resolve(rows[0].id)
      })
    })
  }

  close () {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          return reject(err)
        }
        return resolve()
      });
    })
  }
}
