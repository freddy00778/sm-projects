require('ts-node').register()
const parseDbUrl = require('parse-database-url')

module.exports = require('./src/config').Knex.config
