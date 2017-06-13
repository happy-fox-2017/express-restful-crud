var express = require('express');
var router = express.Router();
const db = require('../models');
var helper = require('../helpers/helper');

router.get('/show',(req,res,next) =>{
  res.locals.helper = helper
  db.todo.findAll({
      include: {model: db.user}
    })
    .then(data =>{
      res.render('show',{alltodo:data})
    })
    .catch(err =>{
      console.log(err);
    })
});

router.get('/delete/:id',(req,res,next) => {
  let id = req.params.id
  db.todo.destroy({where: {id: id}})
  .then(()=>{
    res.redirect('/shows/show')
  })
  .catch(err =>{
    console.log(err);
  })
})

router.get('/edit/:id',(req,res,next)=>{
  db.todo.find({
    where: {id : req.params.id},
    include: {model: db.user}
  })
  .then(data =>{
    db.user.findAll()
    .then(user => {
      res.render('edit_show', {edit_data_memo: data, users: user});
    })
    .catch(err => {
      res.render(err);
    })
  })
  .catch(err => {
    res.render(err);
  })
})

router.post('/edit/:id',(req,res,next)=>{
  db.todo.update({
    title:req.body.title,
    is_complete: req.body.is_complete,
    id_user: req.body.id_user
  },{ where :{id: req.params.id}})
  .then(data=>{
    res.redirect('/shows/show')
  })
  .catch(err =>{
    res.send(err);
  })
})


module.exports = router;

