var express = require('express');
var router = express.Router();

const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll()
  .then((users) => {
    res.render('user', { users });
  });
});

router.get('/add', function(req, res, next) {
  res.render('user_add');
});

router.post('/add', function (req, res) {
  models.User.create({
    email: req.body.email,
  })
  .then(() => {
    res.redirect('/users');
  });
});

router.get('/edit/:id', function (req, res) {
  models.User.findOne({ where: { id: req.params.id } })
  .then((user) => {
    res.render('user_edit', { user });
  });
});

router.post('/edit/:id', function (req, res) {
  models.User.update({
    email: req.body.email,
  },
    { where: { id: req.params.id } })
  .then(() => {
    res.redirect('/users');
  });
});

router.get('/delete/:id', function (req, res) {
  models.User.destroy({ where: { id: req.params.id } })
  .then(() => {
    res.redirect('/users');
  });
});

module.exports = router;
