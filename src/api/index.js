const { Router } = require('express')
const { version } = require('../../package.json')
const products = require('./products')

module.exports = ({ config, db }) => {
  let api = Router()

  // mount the facets resource
  api.use('/products', products)

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version })
  })

  return api
}
