const express = require('express');
const router = express.Router();

const models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  models.Todo.findAll()
  .then((todos) => {
    res.render('todo', { todos });
  });
});

module.exports = router;