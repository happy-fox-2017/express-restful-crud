const express = require('express');
const router = express.Router();
const db = require('../models')
const viewHelper = require('../helpers/views_helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.helper = viewHelper
  db.Todo.findAll({
    include: {model: db.User,required: true}
  })
  .then(_Todos =>{
    db.User.findAll()
    .then(_Users =>{
      res.render('MemoIndex', {todos : _Todos, Users : _Users})
    })
  })
  .catch(err => {
    console.log(err);
  })
});

router.post('/add', (req,res) =>{
  let bodyData = req.body;
  db.Todo.create({
    title : bodyData.title,
    is_complete : bodyData.complete,
    Users_id : bodyData.user
  })
  .then(() =>{
    res.redirect('/memo');
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/edit/:id', function(req,res){
  let id = req.params.id
  db.Todo.findOne({
    include: {model: db.User,required: true},
    where : {id:id}
  })
  .then(_todo =>{
    db.User.findAll()
    .then(_Users =>{
      res.render('MemoEdit', {todo : _todo, Users : _Users})
    })
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/edit/:id', function(req,res){
  let id = req.params.id
  let bodyTodo = req.body;
  db.Todo.update({
    title : bodyTodo.title,
    is_complete : bodyTodo.complete,
    Users_id : bodyTodo.user
  },{
    where : {id:id}
  })
  .then(() =>{
    res.redirect('/memo');
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id', function(req,res){
  let id = req.params.id;
  db.Todo.destroy({
    where : {id:id}
  })
  .then(() =>{
    res.redirect('/memo');
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;
