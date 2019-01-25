const { Router } = require('express')

const { validate, check } = require('../middleware/validation')
const { Product, User } = require('../models')

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

products.post(
  '/addToFavorites',
  [check('userId').isString(), check('productId').isString()],
  validate,
  async (req, res) => {
    const { userId, productId } = req.body
    try {
      const user = await User.findByPk(userId)
      const product = await Product.findByPk(productId)
      if (user && product) {
        await user.addProduct(product.id)
        res.status(200).json(product)
      } else {
        res.status(404).json()
      }
    } catch (e) {
      console.error(e)
      res.status(500).send()
    }
  }
)

products.post(
  '/removeFavorite',
  [check('userId').isString(), check('productId').isString()],
  validate,
  async (req, res) => {
    const { userId, productId } = req.body
    try {
      const user = await User.findByPk(userId)
      const product = await Product.findByPk(productId)
      if (user && product) {
        await user.removeProduct(product)
        res.status(200).json(product)
      } else {
        res.status(404).json()
      }
    } catch (e) {
      console.error(e)
      res.status(500).send()
    }
  }
)

module.exports = products
