const express= require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const passport =require('passport');

const User =require('../models/User');
const Client =require('../models/Client');
const Worker =require('../models/worker');
//login
router.get('/login',(req,res)=>res.render('login'));

//register 
router.get('/registerClient',(req,res)=>res.render('registerClient'));
router.get('/registerWorker',(req,res)=>res.render('registerWorker'));



router.post('/registerClient',(req,res)=>{
    const {name,contact,longitude,latitude,password,password2}=req.body;

    let errors =[];
    //checking if required fields are filled or not
    if(!name || !contact || !longitude || !latitude || !password || !password2){
        errors.push({msg: 'Please fill the required fields'});
    }

    //password check
    if(password!==password2){
        errors.push({msg: 'Passwords not matched'});
    }

    if (password.length<6) {
        errors.push({msg: 'Password shoud be of 6 characters'})
    }
    if (errors.length>0) {
        res.render('registerClient',{
            errors,
            name,
            password,
            password2
        });
    } else {
        // validation done
        Client.findOne({name:name})
        .then(user => {
            if(user){
                errors.push({msg :'UserName already registered'});
                res.render('registerClient',{
                    errors,
                    name,
                    password,
                    password2
                });  
            }
            else{
                const newClient =new Client({
                    name,
                    contact,
                    longitude,
                    latitude,
                    password
                });

                //hashing the password
                bcrypt.genSalt(10,(err,salt)=>
                bcrypt.hash(newClient.password,salt,(err,hash)=>{
                    if (err) throw err;

                    newClient.password = hash;    
                    //save the new user
                    newClient.save()
                    .then(user=>{
                        req.flash('success_msg','You are now registered and can log in');
                        res.redirect('/user/login');
                    })
                    .catch(err=>console.log(err));
                }))
            }
        });
    }
});
router.post('/registerWorker',(req,res)=>{
    const {name,contact,longitude,latitude,experience,field_work,password,password2}=req.body;

    let errors =[];
    //checking if required fields are filled or not
    if(!name || !contact ||!longitude ||!latitude ||!experience || !field_work || !password || !password2){
        errors.push({msg: 'Please fill the required fields'});
    }

    //password check
    if(password!==password2){
        errors.push({msg: 'Passwords not matched'});
    }

    if (password.length<6) {
        errors.push({msg: 'Password shoud be of 6 characters'})
    }
    if (errors.length>0) {
        res.render('registerWorker',{
            errors,
            name,
            password,
            password2
        });
    } else {
        // validation done
        Worker.findOne({name:name})
        .then(user => {
            if(user){
                errors.push({msg :'Username already registered'});
                res.render('registerWorker',{
                    errors,
                    name,
                    password,
                    password2
                });  
            }
            else{
                const newWorkerUser =new Worker({
                    name,
                    contact,
                    longitude,
                    latitude,
                    experience,
                    field_work,
                    password,
                    password2
                });

                //hashing the password
                bcrypt.genSalt(10,(err,salt)=>
                bcrypt.hash(newWorkerUser.password,salt,(err,hash)=>{
                    if (err) throw err;

                    newWorkerUser.password = hash;    
                    //save the new user
                    newWorkerUser.save()
                    .then(user=>{
                        req.flash('success_msg','You are now registered and can log in');
                        res.redirect('/user/login');
                    })
                    .catch(err=>console.log(err));
                }))
            }
        });
    }
});

//login
router.post('/login',(req, res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req,res,next);
});

router.get('/logout',(req, res,next)=>{
    req.logout(function(err){
        if(err){return next(err);}
        req.flash('success_msg','You are now logged out');
    res.redirect('/user/login');  
    });
});    

module.exports = router;