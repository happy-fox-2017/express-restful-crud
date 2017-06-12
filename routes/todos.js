const express = require('express');
const router = express.Router();

const models = require('../models');

/* GET todos listing. */
router.get('/users/view/:userId/todos', function (req, res, next) {
  const userId = req.params.userId;
  models.Todo.findAll(
    {
      order: ['id'],
      include: [{
        model: models.User,
        where: { id: userId },
      }],
    }
  )
  .then((todos) => {
    const promises = [];
    for (let i = 0; i < todos.length; i += 1) {
      const todo = todos[i];
      promises.push(todo.getUser());
    }

    Promise.all(promises)
    .then((values) => {
      for (let i = 0; i < values.length; i += 1) {
        todos[i].user_email = values[i].email;
      }
      res.render('todo', { todos });
    });
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
  models.Todo.update({

  },
    { where: { id: req.params.id } })
  .then(() => {
    res.redirect(`/users/view/${userId}/todos`);
  });
});

router.get('/users/view/:userId/todos/complete/:id', function (req, res) {
  const userId = req.params.userId;
  models.Todo.update({
    isComplete: true,
  },
    { where: { id: req.params.id } })
  .then(() => {
    res.redirect(`/users/view/${userId}/todos`);
  });
});

router.get('/users/view/:userId/todos/uncomplete/:id', function (req, res) {
  const userId = req.params.userId;
  models.Todo.update({
    isComplete: false,
  },
    { where: { id: req.params.id } })
  .then(() => {
    res.redirect(`/users/view/${userId}/todos`);
  });
});

module.exports = router;