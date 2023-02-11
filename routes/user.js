const express= require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const alert=require("alert");
// const passport =require('passport');

const Client =require('../models/Client');
const Worker =require('../models/worker');
const Work =require('../models/work');
const Requests =require('../modelsrequests');
const Requestsforwork =require('../models/requests_for_work');
//login
router.get('/login',(req,res)=>res.render('login'));

//register 
router.get('/registerClient',(req,res)=>res.render('registerClient'));
router.get('/registerWorker',(req,res)=>res.render('registerWorker'));



router.post('/registerClient',(req,res)=>{
    const {name,username,location,contact_no,email, password,password2}=req.body;

    let errors =[];
    //checking if required fields are filled or not
    if(!name || !username || !location || !contact_no || !email || !password || !password2){
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
                    username:req.body.username,
                    location:req.body.location,
                    contact_no:req.body.contact_no,
                    email:req.body.email,
                    password: req.body.password
                });
                newClient.save()
                res.redirect('/login');
            }
        });
    }
});
router.post('/registerWorker',(req,res)=>{
    const {name,worker_id,location,experience,field_work,contact_no,email,id_proof,password,password2}=req.body;

    let errors =[];
    //checking if required fields are filled or not
    if(!name || !worker_id ||!location ||!experience ||!field_work || !contact_no || !email || !id_proof || !password || !password2){
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
                    worker_id:req.body.worker_id,
                    location:req.body.location,
                    experience:req.body.experience,
                    field_work:req.body.field_work,
                    contact_no:req.body.contact_no,
                    email:req.body.email,
                    id_proof:req.body.id_proof,
                    password:req.body.password
                });
                newWorkerUser.save()
                res.redirect('/login');
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

const findcountc=async(value1, value2)=>{
    try{
        const data=await Client.find({$and: [{username: value1}, {password: value2}]}).countDocuments();
        return data
    }catch(error){
        console.log(error.message)
    }
}

const findcountw=async(value1, value2)=>{
    try{
        const data=await Worker.find({$and: [{username: value1}, {password: value2}]}).countDocuments();
        return data
    }catch(error){
        console.log(error.message)
    }
}
// work_id: {
//     type: 'string',
//     required: true
// },
// client_id:{
//     type: 'string',
//     required: true
// },
// work:{
//     type: 'string',
//     required: true
// },
// location:{
//     type: 'string',
//     required: true
// }

const find_all_cards=async(value)=>{
    try{
        const data=await Requests.find({});
        return data
    }catch(error){
        console.log(error.message)
    }
} 

router.get('/worker_all',async (req, res)=>{
    const data=find_all_cards(current_username)
    res.redirect('./all_works', data)
});

const find_recommended_cards=async(value)=>{
    try{
        const data=await Worker.find({username: value});
        const result=data.field_work
        let str="[{"
        for(let i=0;i<result.length;i++){
            const count=await Requestsforwork.find({work: result[i]}).countDocuments();
            const data1=await Requestsforwork.find({work: result[i]});
            for(let j=0;j<count;j++){
                str+="work"+':"'+data1[j].work+'",client_id:"'+data1[j].client_id+'"'
                if(i!=result.length && j!=count){
                    str+=","
                }
            }
        }
        str+="}]"
        const a = await JSON.parse(str)
        return a
    }catch(error){
        console.log(error.message)
    }
} 

router.get('/worker',async (req, res)=>{
    const data=find_recommended_cards(current_username)
    res.redirect('./worker', data)
});

var current_username=undefined;

// login
router.post('/login',async (req, res)=>{
    const result1=findcountc(req.body.username, req.body.password)
    const result2=findcountw(req.body.username, req.body.password)
    if(await result1>0){
        res.redirect('./client')
    }
    else if(await result2>0){
        const data=find_recommended_cards(req.body.username)
        res.redirect('./worker', data)
    }
});

router.get('/logout',(req, res,next)=>{
    req.logout(function(err){
        if(err){return next(err);}
        current_username=undefined
        req.flash('success_msg','You are now logged out');
    res.redirect('/login');  
    });
});  


router.get('/')

module.exports = router