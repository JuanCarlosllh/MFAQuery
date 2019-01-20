const { Router } = require('express')

const { validate, check } = require('../middleware/validation')
const { Product } = require('../models')

let products = Router()

products.get(
  '/',
  [
    check('limit').isNumeric({ no_symbols: true }),
    check('offset').isNumeric({ no_symbols: true }),
    check('category').isIn(['small-appliances', 'dishwashers', undefined])
  ],
  validate,
  async (req, res) => {
    const { limit, offset, category } = req.query
    const condition = category && { type: category }
    const response = await Product.findAll({
      where: condition,
      offset,
      limit
    })
    res.status(200).json(response)
  }
)

module.exports = products
