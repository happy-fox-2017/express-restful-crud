var express = require('express');
var router = express.Router();
const db = require('../models')
const helper = require('../helpers/helper.js');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  db.Todo.findAll({
      include: {
        model: db.User
      }
    })
    .then(todo => {
      // res.send(todo)
      db.User.findAll()
      .then(users => {
        res.render('index', {
          title: todo,
          users: users
        })
      })
    })
})

router.get('/error', function (err,req,res,next) {
  next(err)
})

module.exports = router;
