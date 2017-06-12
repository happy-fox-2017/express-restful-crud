const express = require('express');
const router = express.Router();

const models = require('../models');

/* GET todos listing. */
router.get('/', function (req, res, next) {
  models.Todo.findAll()
  .then((todos) => {
    res.render('todo', { todos });
  });
});

router.get('/add', function(req, res, next) {
  res.render('todo_add');
});

router.post('/add', function (req, res) {
  models.Todo.create({
    title: req.body.title,
    isComplete: false,
  })
  .then(() => {
    res.redirect('/todos');
  });
});

router.get('/edit/:id', function (req, res) {
  models.Todo.findOne({ where: { id: req.params.id } })
  .then((todo) => {
    res.render('todo_edit', { todo });
  });
});

router.post('/edit/:id', function (req, res) {
  models.Todo.update({
    title: req.body.title,
  },
    { where: { id: req.params.id } })
  .then(() => {
    res.redirect('/todos');
  });
});

router.get('/delete/:id', function (req, res) {
  models.Todo.destroy({ where: { id: req.params.id } })
  .then(() => {
    res.redirect('/todos');
  });
});

module.exports = router;