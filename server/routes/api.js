const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const User = require('../models/user')
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
            res.status(200).send(data);
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
                    res.status(200).send(user);
                }
            }
        }
    })

})



router.get('/special',(req,res)=>{
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