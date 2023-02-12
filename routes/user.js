const express= require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const alert=require("alert");
const passport =require('passport');


const Client =require('../models/Client');
const Worker =require('../models/worker');
const postWork = require('../models/postWork');
//login
router.get('/login',(req,res)=>res.render('login'));

//register 
router.get('/registerClient',(req,res)=>res.render('registerClient'));
router.get('/registerWorker',(req,res)=>res.render('registerWorker'));



router.post('/client',async (req,res)=>{
    const text=req.body.text;
    // const option =req.body.option.value;

    const newWork=await postWork({
        // client_id:name,
        // work_id:option,
        description:text,
    })
    newWork.save();
    res.send('Work submitted successfully');

});

router.post('/editclientuserprofile', async(req,res)=>{
    // const {name,username,email,contact_no,location}=req.body;
    const name=req.body.name;
    const username=req.body.username;
    const email=req.body.email;
    const contact_no=req.body.contact_no;
    const location=req.body.location;


    const editedDetails= await Client.updateOne({username :username},{$set: {name:name,
        email:email,
        contact_no:contact_no,
        location:location
    }});
    // const editedDetails = Client({
    //     name:name,
    //     username:username,
    //     email:email,
    //     contact_no:contact_no,
    //     location:location
    // })
    
    res.send('Changes saved successfully');
});


router.post('/editworkerprofile', async(req,res)=>{
    // const {name,username,email,contact_no,location}=req.body;
    const name=req.body.name;
    const username=req.body.username;
    const email=req.body.email;
    const contact_no=req.body.contact_no;
    const location=req.body.location;
    const field_work=req.body.field_work;
    const id_proof=req.body.id_proof;



    const editedDetails= await Worker.updateOne({username :username},{$set: {name:name,
        email:email,
        contact_no:contact_no,
        location:location,
        field_work:field_work,

    }});
    // const editedDetails = Client({
    //     name:name,
    //     username:username,
    //     email:email,
    //     contact_no:contact_no,
    //     location:location
    // })
    
    res.send('Changes saved successfully');
});



router.post('/registerClient',(req,res)=>{
    const {name,username,location,contact_no,email,password,password2}=req.body;
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
            username,
            password,
            password2
        });
    } else {
        // validation done
        Client.findOne({username:username})
        .then(user => {
            if(user){
                errors.push({msg :'UserName already registered'});
                res.render('registerClient',{
                    errors,
                    username,
                    password,
                    password2
                });  
            }
            else{
                const newClient =new Client({
                    name:name,
                    username:username,
                    location:location,
                    contact_no:contact_no,
                    email:email,
                    password:password,
                    password:password2
                });
                newClient.save()
                res.redirect('/login');
            }
        });
    }
});
router.post('/registerWorker',(req,res)=>{
    const {name,username,location,experience,field_work,contact_no,email,id_proof,password,password2}=req.body;

    let errors =[];
    //checking if required fields are filled or not
    if(!name || !username ||!location ||!contact_no ||!experience || !field_work || !email || !id_proof || !password || !password2){
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
            username,
            password,
            password2
        });
    } else {
        // validation done
        Worker.findOne({username:username})
        .then(user => {
            if(user){
                errors.push({msg :'Username already registered'});
                res.render('registerWorker',{
                    errors,
                    username,
                    password,
                    password2
                });  
            }
            else{
                const newWorkerUser =new Worker({
                    name:name,
                    username:username,
                    location:location,
                    experience:experience,
                    field_work:field_work,
                    contact_no:contact_no,
                    email:email,
                    id_proof:id_proof,
                    password:password,
                    // password2:password2
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

const findcountc=async(value1,value2)=>{
    try{
        const data=await Client.find({$and: [{username: value1},{password:value2}]}).countDocuments();
        return data
    }catch(error){
        console.log(error.message)
    }
}

const findcountw=async(value1,value2)=>{
    try{
        const data=await Worker.find({$and: [{username: value1},{password:value2}]}).countDocuments();
        return data
    }catch(error){
        console.log(error.message)
    }
}

// login
router.post('/login',async (req, res)=>{
    const result1=findcountc(req.body.username,req.body.password)
    const result2=findcountw(req.body.username,req.body.password)
    
    if(await result1>0){
        console.log(result1);
    console.log(result2);
        console.log("found in client")
        res.redirect('./client')
    }
    else if(await result2>0){
        // console.log(result1);
    console.log(result2);
        console.log("found in worker")
        res.redirect('./worker')
    }
});

router.get('/logout',(req, res,next)=>{
    req.logout(function(err){
        if(err){return next(err);}
        req.flash('success_msg','You are now logged out');
    res.redirect('/login');  
    });
});    


router.get('/')

module.exports = router