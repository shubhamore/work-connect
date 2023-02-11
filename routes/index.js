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

module.exports = router;