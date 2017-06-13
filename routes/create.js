var express = require('express');
const db = require('../models');
const util = require('../helpers/util.js')
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  db.User.findAll()
  .then(users => {
    res.render('create', { 'users': users })
  })
})

router.post('/', (req, res, next) => {
  let title = req.body.task;
  let email = req.body.email;
  db.User.findOne({where: {'email': email}})
  .then(user => {
    db.Todo.create({
      'title': title,
      'is_complete': false,
      'UserId': user.id
    })
    .then(() => {
      res.redirect(`/tasks`)
    })
  })
})

module.exports = router;
