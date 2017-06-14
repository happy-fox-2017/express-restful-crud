var express = require('express');
var router = express.Router();
const db = require('../models')
const helper = require('../helpers/helper.js');

router.get('/', function(req, res, next) {
  db.Todo.findAll({
      include: {
        model: db.User
      }, order:[['id', 'ASC']]
    })
    .then(todo => {
      // res.send(todo)
      db.User.findAll()
        .then(users => {
          res.render('viewAll', {
            data: todo,
            users: users,
            help: helper
          })
        })
    })
})

router.get('/create', function(req, res, next) {
  db.User.findAll()
    .then((_users) => {
      res.render('create', {
        users: _users
      })
    })
})

router.post('/create', function(req, res, next) {
  let userId = req.body.user
  let todo = req.body.todo
  console.log('masuk', userId);
  db.Todo.create({
      title: todo,
      completion: false,
      userId: +userId
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(() => {
      let err = new Error('Specify user')
      next(err)
    })
})

router.get('/setting/:id', function(req, res, next) {
  db.Todo.findById(req.params.id, {
      include: {
        model: db.User
      }
    })
    .then((_todo) => {
      db.User.findAll({
          where: {
            id: {
              $ne: _todo.User.id
            }
          }
        })
        .then(_users => {
          // res.json(_todo)
          res.render('setting', {
            todo: _todo,
            users: _users
          })
        })
    })
})

router.post('/setting', function(req, res, next) {
  // res.json(req.body)
  let body = req.body
  if (body.option == 'Edit') {
    db.Todo.findOne({
      where: {
        title: body.todo
      }
    })
    .then(memo => {
      // res.json(body)
      if (memo.userId == body.user_id) {
        memo.updateAttributes({
          title: body.todo,
          completion: (body.completion === '') ? true : false
        })
        .then(() => {
          res.redirect('/memos')
        })
      } else {
        let err = new Error ('User invalid!')
        next(err)
      }
    })
  } else if (body.option == 'Delete') {
    db.Todo.findOne({
      where: {
        title: body.todo
      }
    }).then((memo) => {
      if (memo.userId == body.user_id) {
        db.Todo.findById(memo.id)
        .then((memo) => {
          return memo.destroy()
        })
        .then(() => {
          res.redirect('/memos')
        })
      } else {
        let err = new Error ('User invalid!')
        next(err)
      }
    })
  }
})

// router.get('/delete/:id', (req, res) => {
//   let _id = req.params.id
//   db.Todo.findById(_id)
//   .then((memo) => {
//     return memo.destroy()
//   })
//   .then(() => {
//     res.redirect('/memos')
//   })
// })



module.exports = router;