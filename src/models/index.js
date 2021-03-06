const Sequelize = require('sequelize')
const config = require('../config')

const Product = require('./Product')
const User = require('./User')

const db = {}

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    dialect: 'postgres',
    define: {
      timestamps: false
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false,
    logging: false
  }
)

db['Product'] = Product(sequelize, Sequelize)
db['User'] = User(sequelize, Sequelize)

// Relations
db['Product'].belongsToMany(db['User'], { through: 'UserProduct' })
db['User'].belongsToMany(db['Product'], { through: 'UserProduct' })

module.exports = db
