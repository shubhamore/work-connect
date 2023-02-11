const express= require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const alert=require("alert");
// const passport =require('passport');

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
                    name:req.body.name,
                    contact:req.body.contact,
                    longitude:req.body.longitude,
                    latitude:req.body.latitude,
                    password:req.body.password
                });
                newClient.save()
                res.redirect('/user/login');
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
                    name:req.body.name,
                    contact:req.body.contact,
                    longitude:req.body.longitude,
                    latitude:req.body.latitude,
                    experience:req.body.experience,
                    field_work:req.body.field_work,
                    password:req.body.password
                });
                newWorkerUser.save()
                res.redirect('/user/login');
            }
        });
    }
});

// const finddoc=async(value)=>{
//     try{
//         const data=await Client.find({name: value});
//         console.log(data)
//         return data
//     }catch(error){
//         console.log(error.message)
//     }
// }

const findcountc=async(value)=>{
    try{
        const data=await Client.find({name: value}).countDocuments();
        return data
    }catch(error){
        console.log(error.message)
    }
}

const findcountw=async(value)=>{
    try{
        const data=await Worker.find({name: value}).countDocuments();
        return data
    }catch(error){
        console.log(error.message)
    }
}

// login
router.post('/login',async (req, res)=>{
    const result1=findcountc(req.body.name)
    const result2=findcountw(req.body.name)
    if(await result1>0){
        console.log("found in client")
        res.render('client')
    }
    else if(await result2>0){
        console.log("found in worker")
        res.render('worker.ejs')
    }
});

router.get('/logout',(req, res,next)=>{
    req.logout(function(err){
        if(err){return next(err);}
        req.flash('success_msg','You are now logged out');
    res.redirect('/user/login');  
    });
});    


router.get('/')

module.exports = router