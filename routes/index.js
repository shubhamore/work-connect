const express =require('express');
const router =express.Router();

router.get('/',(req,res)=>{
    res.render('welcome');
});
//dashboard page
router.get('/dashboard',(req,res)=>res.render('dashboard'));

//worker page
router.get('/worker',(req,res)=>res.render('worker_index'));
router.get('/worker_all',(req,res)=>res.render('all_works'));
router.get('/worker_applications',(req,res)=>res.render('my_applications'));
router.get('/userprofile',(req,res)=>res.render('userprofile'));


//this is only for test----delete this afterwards
router.get('/client',(req,res)=>{
    res.render('client')
})
router.get('/client/pastIssues',(req,res)=>{
    res.render('pastIssues')
})
router.get('/client/clientuserprofile',(req,res)=>{
    res.render('clientuserprofile')
})


module.exports=router;