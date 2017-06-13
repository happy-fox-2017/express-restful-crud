var express = require('express')
var db = require('../models')
var router = express.Router()
var dateHelper = require('../helpers/date')

router.get('/',(req,res) => {
  res.locals.helpers = dateHelper
  db.User.findAll({
    include : [{
      model: db.Todo
    }]
  })
  .then(_userTodos => {
    res.render("todos/index",{userTodos : _userTodos})
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
  db.User.findOne({where : {email : _email}})
  .then(user => {
    db.Todo.create({UserId:user.id, title:_task})
    .then(() => {
      res.redirect('/todos')
    })
    .catch(err => {
      console.log(err);
    })
  })
})

router.get('/edit/:id',(req,res) => {
  let _id = req.params.id
  let _user;
  db.User.findAll(
    {
    include : [{
      model: db.Todo,
      where : {id : _id},
      required : false
    }]
  }
).then(_users => {
    _users.forEach(user => {
      if (user.Todos.length != 0) {
        _user = user
      }
    })
    res.render('todos/edit', {users: _users, user: _user})
  })
})

router.post('/edit/:id', (req,res) => {
  let _id = req.params.id
  let _task = req.body.task
  let _is_complete = req.body.status

  db.Todo.update(
    {
      title : _task,
      is_complete : _is_complete
    },
    {
      where:{id:_id}
    }
  )
  .then(todo => {
    res.redirect("/todos")
  })
  .catch(err => {
    res.render("todos/edit", {err : err.message})
  })
})


router.get('/delete/:id', (req,res) => {
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
