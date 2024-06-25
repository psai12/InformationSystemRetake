const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config({path:'../config.env'});
const ejs=require('ejs');
const path = require('path');
const app=express();

app.set('ejs','views');

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
     res.render('index.ejs');
});
app.listen("2000",()=>{console.log('Server started!')});
