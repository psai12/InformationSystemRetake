const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config({path:'../config.env'});
const path = require('path');
const app=express();
const database=require('mongoose');
const dbConnect = require('./database/database.js');
const registermodel=require('./models/registermodel.js');

dbConnect();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
     res.render('index.ejs');
});
app.get('/login',(req,res)=>{
     res.render('login.ejs');
})
.post('/login',CheckForLoginDetails,async (req,res,next)=>{
     try
     {
          const user = await registermodel.findOne({
               email: req.email,
           });

        if(user)
        {
          res.send('User found!');
        }
        else
        {
          res.status(400).send('Some details are mismatching!');
        }
     }
     catch(exp)
     {
          res.status(500).send('An error occurred while creating the user');
     }
});



app.get('/register',(req,res)=>{
     res.render('register.ejs');
})
.post('/register',CheckForRegisterDetails,async (req,res)=>{
  
     try
     {
          const user = await registermodel.create({
               name: req.name,
               email: req.email,
               password: req.password
           });
        if(user)
        {
          res.send('User has been created!');
        }
        else
        {
          res.status(400).send('Some details are mismatching!');
        }
     }
     catch(exp)
     {
          res.status(500).send('An error occurred while creating the user');
     }
});

function CheckForRegisterDetails(req,res,next){
     const {name,email,password,confirmpassword}=req.body;
     if(name=='')
     {
          console.log('name is empty');
          return res.status(400).send('Name is required');
     }
     else if(email=='')
     {
          console.log('email is empty');
          return res.status(400).send('Email is required');
     }
     else if(password=='')
     {
          console.log('password is empty');
          return res.status(400).send('Password is required');
     }
     else if(confirmpassword=='')
     {
          console.log('confirmpassword is empty');
          return res.status(400).send('Confirm password is required');
     }
     else if(password!==confirmpassword)
     {
          console.log('Password does not match');
          return res.status(400).send('Password does not match');
     }
     req.name=name;
     req.email=email
     req.password=password
     next();
}

function CheckForLoginDetails(req,res,next){
     const {email,password}=req.body;
     if(email=='')
     {
          console.log('email is empty');
          return res.status(400).send('Email is required');
     }
     else if(password=='')
     {
          console.log('password is empty');
          return res.status(400).send('Password is required');
     }
     req.email=email
     req.password=password
     next();
}

app.listen("2000",()=>{console.log('Server started!')});
