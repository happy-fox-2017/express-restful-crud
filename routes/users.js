var express = require('express');
var router = express.Router();
const db = require('../models');

/* GET home page. */

router.get('/input_memo',(req,res,next) =>{
  db.user.findAll()
  .then(data =>{
    res.render('input_memo',{users:data})
  })
  .catch(err =>{
    res.render(err);
  })
})

router.post('/create_memo',(req,res,next) =>{
  db.todo.create(req.body)
  .then(data =>{
    res.redirect('/shows/show')
  })
  .catch(err =>{
    console.log(err.message);
    res.redirect('/')
  })
})

router.get('/add',(req,res,next)=>{
  db.user.findAll()
  .then(data =>{
    res.render('add',{data_user:data})
  })
  .catch(err =>{
    console.log(err);
  })
})

router.post('/add',(req,res,next) =>{
  db.user.create(req.body)
  .then(data =>{
    res.redirect('add')
  })
  .catch(err =>{
    console.log(err);
  })
})

router.get('/edit/:id',(req,res,next) =>{
  let id = req.params.id
  let name = req.params.name
  let email = req.param.email
  
  db.user.findById(id)
  .then(data =>{
    res.render('edit',{data_id: data})
  })
  .catch(err =>{
    console.log(err);
  })
})

router.post('/edit/:id',(req,res,next)=>{
  let id = req.params.id
  let name = req.body.name
  let email = req.body.email
  
  db.user.update(
    {
      name: name,
      email: email
    },{where: {id: id}}
  )
  .then(data =>{
    res.redirect('/users/add')
  })
  .catch(err =>{
    console.log(err);
  })
})  

router.get('/delete_user/:id',(req,res,next) =>{
  let id = req.params.id
  
  db.user.destroy({ where: {id: id}})
  .then(() =>{
    res.redirect('/users/add')
  })
  .catch(err =>{
    console.log(err);
  })
})


module.exports = router;
