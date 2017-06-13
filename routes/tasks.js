var express = require('express');
const db = require('../models');
const util = require('../helpers/util.js')
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  db.Todo.findAll({
    order: [['createdAt', 'ASC']], include: {model: db.User}
  })
  .then(todos => {
    res.render('tasks', { 'todos': todos, 'util': util })
  })
})

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id
  db.Todo.findById(id)
  .then(todo => {
    res.render('task-edit', { 'todo': todo })
  })
});

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id
  let title = req.body.task
  let status = req.body.is_complete
  db.Todo.findById(id)
  .then(todo => {
    todo.update({'title': title, 'is_complete': status})
    .then(() => {
      res.redirect('/tasks')
    })
  })
});

router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id
  db.Todo.destroy({
    where: {
      'id': id
    }
  })
  .then(() => {
    res.redirect('/tasks')
  })
});

module.exports = router;
