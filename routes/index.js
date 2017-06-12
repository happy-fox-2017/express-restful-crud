var express = require('express');
var router = express.Router();
const models = require('../models');

/* GET home page. */
router.get('/', (req, res, next) => {
  models.todo.findAll(
    {
      include: {model: models.user}
    })
    .then(data =>{
      res.render('index', { todos: data });
    })
    .catch(err=>{
      console.log(err);
    })
});


module.exports = router;
