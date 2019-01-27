const { Router } = require('express')

const { validate, check } = require('../middleware/validation')
const { Product, User } = require('../models')

let favorites = Router()

favorites.get('/getByUser/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findByPk(userId)
    const favorites = await user.getProducts()
    res.status(200).json(favorites)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
})

favorites.post(
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

favorites.post(
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

favorites.post(
  '/share',
  [check('fromUserId').isString(), check('toUserId').isString()],
  validate,
  async (req, res) => {
    const { fromUserId, toUserId } = req.body
    try {
      const fromUser = await User.findByPk(fromUserId)
      const toUser = await User.findByPk(toUserId)
      if (fromUser && toUser) {
        const fromFavorites = await fromUser.getProducts()
        await toUser.addProducts(fromFavorites)
        res.status(200).send()
      } else {
        res.status(404).send()
      }
    } catch (e) {
      console.error(e)
      res.status(500).send()
    }
  }
)

module.exports = favorites
