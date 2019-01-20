const { Router } = require('express')

const { validate, check } = require('../middleware/validation')
const { Product } = require('../models')

let products = Router()

products.get(
  '/small-appliances',
  [
    check('limit').isNumeric({ no_symbols: true }),
    check('offset').isNumeric({ no_symbols: true })
  ],
  validate,
  async (req, res) => {
    const { limit, offset } = req.query
    const response = await Product.findAll({
      where: { type: 'small-appliances' },
      offset,
      limit
    })
    res.status(200).json(response)
  }
)

products.get(
  '/dishwashers',
  [
    check('limit').isNumeric({ no_symbols: true }),
    check('offset').isNumeric({ no_symbols: true })
  ],
  validate,
  async (req, res) => {
    const { limit, offset } = req.query
    const response = await Product.findAll({
      where: { type: 'dishwashers' },
      offset,
      limit
    })
    res.status(200).json(response)
  }
)

module.exports = products
