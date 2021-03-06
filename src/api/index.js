const { Router } = require('express')
const { version } = require('../../package.json')
const products = require('./products')
const users = require('./users')
const favorites = require('./favorites')

module.exports = ({ config, db }) => {
  let api = Router()

  // mount the facets resource
  api.use('/products', products)
  api.use('/users', users)
  api.use('/favorites', favorites)

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version })
  })

  return api
}
