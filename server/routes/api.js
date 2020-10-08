const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

var db = mongoose.connect('mongodb://localhost:27017/codeauth',  { useNewUrlParser: true }, function(err, response){  
    if(err){ console.log( err); }  
    else{ console.log('Connected to ' + db, ' + ', response); }  
 });  

router.get('/',(req,res)=>{
    res.send('From API Route')
})

router.post('/register',(req,res)=>{
    let userDate = req.body
    let user = new User(userDate)
    user.save((err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            let payload = {subject:data._id}
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token});
        }
    })
})


router.post('/login',(req,res)=>{
    let userDate = req.body 

    User.findOne({email:userDate.email},(error,user)=>{
        if(error){
            console.log(error);
        }
        else{
            if(!user){
                res.status(401).send('Invalid email');
            }
            else{
                if(user.password !==userDate.password){
                    res.status(401).send('Invalid password')
                }
                else{
                    let payload = {subject:user._id}
                    let token = jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    })

})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject;
    next();
  }


router.get('/special', verifyToken,(req,res)=>{
    let specialEvents  = [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"1",
            "name":"Audgfo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        

    ]
    res.json(specialEvents);
})


router.get('/events',(req,res)=>{
    let events = [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Expo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "_id":"1",
            "name":"Audgfo",
            "description":"lorem ipsum",
            "date":"2012-04-23T18:25:43.511Z"
        },
        

    ]
    res.json(events);
})
module.exports= router;