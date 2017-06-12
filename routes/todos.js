const express = require('express');
const router = express.Router();

const models = require('../models');

/* GET todos listing. */
router.get('/users/view/:userId/todos', function (req, res, next) {
  const userId = req.params.userId;
  models.Todo.findAll(
    {
      include: [{
        model: models.User,
        where: { id: userId },
      }],
    }
  )
  .then((todos) => {
    res.render('todo', { todos });
  });
});

router.get('/users/view/:userId/todos/add', function(req, res, next) {
  const userId = req.params.userId;
  res.render('todo_add', { userId });
});

router.post('/users/view/:userId/todos/add', function (req, res) {
  const userId = req.body.userId;
  console.log('-------------->', userId);
  models.Todo.create({
    title: req.body.title,
    isComplete: false,
  })
  .then((todo) => {
    models.User.findOne({
      where: { id: userId },
    })
    .then((user) => {
      user.addTodo(todo);
      res.redirect(`/users/view/${userId}/todos`);
    });
  });
});

router.get('/users/view/:userId/todos/edit/:id', function (req, res) {
  const userId = req.params.userId;
  models.Todo.findOne({ where: { id: req.params.id } })
  .then((todo) => {
    res.render('todo_edit', { todo, userId });
  });
});

router.post('/users/view/:userId/todos/edit/:id', function (req, res) {
  const userId = req.body.userId;
  models.Todo.update({
    title: req.body.title,
  },
    { where: { id: req.params.id } })
  .then(() => {
    res.redirect(`/users/view/${userId}/todos`);
  });
});

router.get('/users/view/:userId/todos/delete/:id', function (req, res) {
  const userId = req.params.userId;
  models.Todo.destroy({ where: { id: req.params.id } })
  .then(() => {
    res.redirect(`/users/view/${userId}/todos`);
  });
});

module.exports = router;