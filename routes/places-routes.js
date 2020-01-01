const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('Get Requestes from places')
  res.json({ massage: 'Its WOrks' })
})

module.exports = router
