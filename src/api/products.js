const { Router } = require('express')

const { validate, check } = require('../middleware/validation')
const { Product, User } = require('../models')

let products = Router()

products.get(
  '/',
  [
    check('limit').isNumeric({ no_symbols: true }),
    check('offset').isNumeric({ no_symbols: true }),
    check('category').isIn(['small-appliances', 'dishwashers', undefined]),
    check('orderBy')
      .optional()
      .isIn(['price', 'name']),
    check('orderDirection')
      .optional()
      .isIn(['DESC', 'ASC'])
  ],
  validate,
  async (req, res) => {
    const { limit, offset, category, orderBy, orderDirection } = req.query
    const condition = category && { type: category }
    const order = []
    if (orderBy) {
      order.push([orderBy, orderDirection || 'ASC'])
    }
    const response = await Product.findAll({
      where: condition,
      offset,
      limit,
      order
    })
    res.status(200).json(response)
  }
)

module.exports = products
