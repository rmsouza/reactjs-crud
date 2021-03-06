const sqlite3 = require('sqlite3')
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

  async create (table, obj) {
    if (typeof obj !== 'object' || typeof table !== 'string') {
      return Promise.reject(Error('A valid object and table name should be provided'))
    }

    const columns = Object.keys(obj).join(',')
    const values = Object.values(obj)
    const placeholders = values.map(value => '?').join(',')

    const sql = `INSERT INTO ${table}(${columns}) VALUES (${placeholders})`

    await new Promise((resolve, reject) => {
      this.db.run(sql, values, (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })

    const id = await this.getLastInsertId()
    return this.getOne(table, { id })
  }

  async update (table, obj) {
    if (typeof obj !== 'object' || typeof table !== 'string') {
      return Promise.reject(Error('A valid object and table name should be provided'))
    }

    if (!obj.id) {
      return Promise.reject(Error('The id should be provide to update'))
    }

    const id = obj.id
    delete obj.id
    const placeholders = Object.keys(obj).map(key => `${key}=?`).join(',')
    const values = Object.values(obj)
    values.push(id)

    const sql = `UPDATE ${table} SET ${placeholders} WHERE id = ?`

    await new Promise((resolve, reject) => {
      this.db.run(sql, values, (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })

    return this.getOne(table, { id })
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

  getAll (table) {
    if (typeof table !== 'string') {
      return Promise.reject(Error('A valid table name should be provided'))
    }

    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
        if (err) {
          return reject(err)
        }
        return resolve(rows)
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

  deleteOne (table, id) {
    if (!id || typeof table !== 'string') {
      return Promise.reject(Error('A valid id and table name should be provided'))
    }

    const sql = `DELETE FROM ${table} WHERE id = ?`
    return new Promise((resolve, reject) => {
      this.db.run(sql, [id], (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

  deleteAll (table) {
    if (typeof table !== 'string') {
      return Promise.reject(Error('A valid id and table name should be provided'))
    }

    const sql = `DELETE FROM ${table}`
    return new Promise((resolve, reject) => {
      this.db.run(sql, [], (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
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
      })
    })
  }
}
