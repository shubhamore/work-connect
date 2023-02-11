const express =require('express');
const router =express.Router();

router.get('/',(req,res)=>{
    res.render('welcome');
});
//dashboard page
router.get('/dashboard',(req,res)=>res.render('dashboard'));

//this is only for test----delete this afterwards
router.get('/client',(req,res)=>{
    res.render('client')
})
router.get('/client/pastIssues',(req,res)=>{
    res.render('pastIssues')
})
router.get('/client/userprofile',(req,res)=>{
    res.render('userprofile')
})

module.exports = router;