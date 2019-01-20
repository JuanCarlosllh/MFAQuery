const { Router } = require('express')
const { Product } = require('../models')

let products = Router()

products.get('/small-appliances', async (req, res) => {
  const { limit, offset } = req.query
  const response = await Product.findAll({
    where: { type: 'small-appliances' },
    offset,
    limit
  })
  res.json(response)
})

products.get('/dishwashers', async (req, res) => {
  const { limit, offset } = req.query
  const response = await Product.findAll({
    where: { type: 'dishwashers' },
    offset,
    limit
  })
  res.json(response)
})

module.exports = products
