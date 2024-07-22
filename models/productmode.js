const mongo=require('mongoose');

const schema=mongo.Schema({
  
name:{
    type:String,
    required:true
},
  
price:{
    type:String,
    required:true,
},
  
imgpath:{
    type:String,
}
})

const productmodel=mongo.model('productmodel',schema);

module.exports=productmodel;