const mongo=require('mongoose');

const schema=mongo.Schema({
  
name:{
    type:String,
    required:true
},
  
email:{
    type:String,
    required:true,
    unique:true,
},
  
password:{
    type:String,
    required:true
}
})

const registermodel=mongo.model('registermodel',schema);

module.exports={registermodel};