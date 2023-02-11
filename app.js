const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session= require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path=require('path')

const app = express();

require('./config/passport')(passport);

const db=require('./config/keys').MongoURI;

//connecting to Mongo
mongoose.connect(db, {useNewUrlParser: true})
.then(() => {
    console.log('MongoDB Connected...')
}).catch((err) => {
    console.log(err);
});

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
});

// Routes
app.use('/',require('./routes/index'));
app.use('/',require('./routes/user'));
const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started at ${PORT}`)); 