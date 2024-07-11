const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config({path:'../config.env'});
const path = require('path');
const app=express();
const database=require('mongoose');
const dbConnect = require('./database/database.js');
const register=require('./models/registermodel.js');

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
});

app.get('/register',(req,res)=>{
     res.render('register.ejs');
})
.post('/register',async (req,res,next)=>{
  
     CheckForDetails(req,res,next);
     
     try
     {
        const user
     }
     catch(exp)
     {

     }
});

function CheckForDetails(req,res,next){
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
     next();
}
app.listen("2000",()=>{console.log('Server started!')});
