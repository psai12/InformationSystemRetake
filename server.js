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

app.get('/',(req,res)=>{
     res.render('index.ejs');
});
app.get('/login',(req,res)=>{
     res.render('login.ejs');
});

app.get('/register',(req,res)=>{
     res.render('register.ejs');
});
app.listen("2000",()=>{console.log('Server started!')});
