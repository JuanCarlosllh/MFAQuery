const { Router } = require('express')
const { version } = require('../../package.json')
// import facets from './facets'

module.exports = ({ config, db }) => {
  let api = Router()

  // mount the facets resource
  // api.use('/facets', facets({ config, db }))

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version })
  })

  return api
}
