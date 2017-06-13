const express = require('express');
const router = express.Router();
const db = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.User.findAll()
  .then(_Users => {
    res.render('UsersIndex', {Users:_Users});
  })
  .catch(err =>{
    console.log(err);
  })
});

router.post('/add',(req,res) =>{
  let newUser = req.body;
  db.User.create({
    name : newUser.name,
    email : newUser.email
  })
  .then(()=>{
    res.redirect("/users");
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/edit/:id', (req,res) => {
  let editid = req.params.id
  db.User.findOne({
    where : {id:editid}
  })
  .then((_Users) =>{
    res.render("UsersEdit", {Users:_Users})
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/edit/:id', (req,res)=>{
  let id = req.params.id;
  let editUser = req.body;
  db.User.update({
    name : editUser.name,
    email : editUser.email
  }, {
    where : {id : id}
  })
  .then(()=>{
    res.redirect("/users");
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id', function(req,res){
  let id = req.params.id;
  db.User.destroy({
    where : {id:id}
  })
  .then(()=>{
    res.redirect('/users');
  })
})

module.exports = router;