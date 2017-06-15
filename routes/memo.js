var express = require('express');
var router = express.Router();
var helper = require('../helper/helper.js')
const db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Todo.findAll(
    { include: [{ model: db.User }]}
  )
  .then((todos) => {
    db.User.findAll()
    .then((users) => {
      res.render('memo', {data: todos, helper: helper, users: users});
    })
  })
  .catch((err) => {
    console.log(err);
  })
});

router.post('/', function(req, res, next){
  let task = req.body.task;
  let idUser = req.body.UserId;
  db.Todo.create({
    'title': task,
    'UserId': idUser
  })
  .then(() => {
    res.redirect('/memo');
  })
  .catch((err) => {
    console.log(err);
  });
})

router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id

  db.Todo.find(
    { include: [{ model: db.User }]},
    {where: {id: id}}
  )
  .then((todo) => {
    db.User.findAll()
    .then((users) => {
      res.render('edit', {todo: todo, users: users})
    })
  })
});

router.post('/edit/:id', function(req, res, next) {
  let id = req.params.id

  let title = req.body.task
  let UserId = req.body.UserId
  let is_complete = req.body.is_complete
  db.Todo.update(
    {title: title, UserId: UserId, is_complete: is_complete},
    {where: {id: id}}
  )
  .then(() => {
    res.redirect('/memo')
  })
});

router.get('/delete/:id', function(req, res, next) {
  let id = req.params.id
  db.Todo.destroy({
    where: {'id': id}
  })
  .then(() => {
    res.redirect('/memo');
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
