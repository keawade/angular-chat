var express = require('express')
var router = express.Router()

router.get('/user', function (req, res) {
  res.send('[api.js] GET /user')
})

module.exports = router
