const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config({path:'../config.env'});
const path = require('path');
const app=express();
const database=require('mongoose');
const dbConnect = require('./database/database.js');
const registermodel=require('./models/registermodel.js');
const productmodel=require('./models/productmode.js');
const cookieParser = require('cookie-parser');

dbConnect();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use((req, res, next) => {
     res.locals.cookies = req.cookies.user || ''; 
     next();
 });

app.get('/',(req,res)=>{
     
     const user=req.cookies.user;
     res.render('index.ejs', { cookies: user || '' });
});

app.get('/cart',(req,res)=>{
     
     const user=req.cookies.user;
     res.render('cart.ejs', { cookies: user || '' });
});

app.get('/login',(req,res)=>{
     res.render('login.ejs',{ cookies: res.locals.cookies });
})
.post('/login',CheckForLoginDetails,async (req,res,next)=>{
     try
     {
          const user = await registermodel.findOne({
               email: req.email,
           });
         console.log(req.email,req.password)
        if(user)
        {
     
          if(user.password==req.password)
          {
               res.cookie('user',req.email,{maxAge:100000});
               res.redirect('/')
          }
          else
          {
               res.status(400).send('Password Incorrect!');
          }
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

app.post('/addproducts',async (req,res)=>{
     ProductCollection = [
          {"name": "Control your mind", "price": "$10", "imgpath": "assets/section1book1.jpg"},
          {"name": "Court", "price": "$10", "imgpath": "assets/section1book2.jpg"},
          {"name": "Seven Husbands", "price": "$13", "imgpath": "assets/section1book3.jpg"},
          {"name": "Game of thrones", "price": "$12", "imgpath": "assets/section1book4.jpg"},
          {"name": "fifty shades", "price": "$11", "imgpath": "assets/section1book5.jpg"},
          {"name": "I don't love", "price": "$20", "imgpath": "assets/section1book6.jpg"},
          {"name": "Faulker", "price": "$10", "imgpath": "assets/section2book1.jpg"},
          {"name": "Tales of Austin", "price": "$12", "imgpath": "assets/section2book2.jpg"},
          {"name": "Priari Song", "price": "$15", "imgpath": "assets/section2book3.jpg"},
          {"name": "The letters of love", "price": "$17", "imgpath": "assets/section2book4.jpg"},
          {"name": "Through sky war", "price": "$20", "imgpath": "assets/section2book5.jpg"},
          {"name": "Deamons bride", "price": "$30", "imgpath": "assets/section2book6.jpg"},
          {"name": "Love", "price": "$14", "imgpath": "assets/section2book4.jpg"},
          {"name": "Defriencher", "price": "$13", "imgpath": "assets/section3book1.jpg"},
          {"name": "Jeanne", "price": "$17", "imgpath": "assets/section3book2.jpg"},
          {"name": "How to be wicked women", "price": "$19", "imgpath": "assets/section3book3.jpg"},
      ]
      
      try {
          const createdProducts = await productmodel.create(ProductCollection);
          res.status(201).json(createdProducts); // Respond with created products
      } catch (err) {
          console.error('Error creating products:', err);
          res.status(500).send('Error creating products'); // Handle error
      }
})

app.get('/search/:ID',async (req,res)=>{
     const param = req.params.ID;

     try {
         const products = await productmodel.find({ "name": { '$regex': param, '$options': 'i' } });
 
         let result = products.map(product => ({
             _id: product._id.toString(), // Convert ObjectId to string
             name: product.name,
             price: product.price,
             imgpath: product.imgpath
         }));
 
         console.log(result); // Log results to server console
 
         return res.status(200).json(result);
     } catch (err) {
         console.error('Error searching products:', err);
         return res.status(500).json({ message: 'Error searching products' });
     }
});

app.get('/logout',(req,res)=>{
   res.cookie('user','',{expires:new Date(Date.now())});
   res.redirect('/');
});


app.get('/register',(req,res)=>{
     res.render('register.ejs',{ cookies: res.locals.cookies });
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
     console.log('check',password)
     next();
}

app.listen("2000",()=>{console.log('Server started!')});
