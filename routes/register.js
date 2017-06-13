var express = require('express');
const db = require('../models');
const util = require('../helpers/util.js')
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('register')
})

router.post('/', (req, res, next) => {
  let email = req.body.email
  db.User.create({'email': email})
  .then(() => {
    res.redirect('/')
  })
})

module.exports = router;
