var express = require('express')
var db = require('../models')
var router = express.Router()
var helper = require('../helper')

router.get('/',(req,res) => {
  db.User.findAll({
    include : [{
      model: db.Todo
    }]
  })
  .then(_userTodos => {
    res.render("todos/index",{userTodos : _userTodos})
    // res.json(_userTodos)
  })
})

router.get('/create', (req,res) => {
  db.User.findAll()
  .then( _users => {
    res.render('todos/create', {users:_users})
  })
})

router.post('/create', (req,res) => {
  let _email = req.body.email
  let _task = req.body.task
  db.Todo.create({email:_email, task:_task})
  .then(() => {
    res.redirect('/todos')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/edit/:id',(req,res) => {
  let _id = req.params.id
  db.User.findAll(
    {
    include : [{
      model: db.Todo,
      where : {id : _id},
      required : false
    }]
  }
).then(_users => {
    res.render('todos/edit', {users: _users})
    // res.json(_users)
  })
})

router.post('/edit/:id', (req,res) => {
  let _id = req.params.id
  let _task = req.body.task
  let _is_complete = req.body.status
  db.Todo.update(
    {
      where:{id:_id}
    },{
      task : _task,
      is_complete : _is_complete
    }
  )
  .then(todo => {
    res.redirect("/todos")
  })
  .catch(err => {
    res.render("todos/edit", {err : err.message})
  })
})

router.get('/delete/:id',(req,res) => {
  let _id = req.params.id
  db.Todo.findOne({where:{id:_id}, include :[{model:db.User}]})
  .then(function (_todo) {
    // res.render('todos/delete',{todo:_todo})
    res.json(_todo)
  })
})

router.post('/delete/:id', (req,res) => {
  let _id = req.params.id
  db.Todo.destroy({
    where : {id:_id}
  })
  .then(() => {
    res.redirect('/todos')
  })
  .catch((err) => {
    res.json(err)
  })
})





module.exports = router
