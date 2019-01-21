const { Router } = require('express')

const { validate, check } = require('../middleware/validation')
const { User } = require('../models')

let users = Router()

users.post(
  '/',
  [check('username').isString(), check('password').isString()],
  validate,
  async (req, res) => {
    const { username, password } = req.body
    try {
      await User.create({ username, password })
      return res.status(201).json()
    } catch (err) {
      console.error(err)
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send()
      } else return res.status(500).send()
    }
  }
)

users.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (user) return res.status(200).json(user)
    else return res.status(404).send()
  } catch (err) {
    console.error(err)
    return res.status(500).send()
  }
})
module.exports = users
