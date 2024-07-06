const mongo=require('mongoose');

const schema=mongo.Schema({
  
name:{
    Type:String,
    required:true
},
  
email:{
    Type:String,
    required:true,
    unique:true,
},
  
password:{
    Type:String,
    required:true
}
})

const registermodel=mongo.model('resgitermodel',schema);

module.exports=registermodel;