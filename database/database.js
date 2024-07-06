const mongo=require('mongoose');

async function dbConnect()
{
try
{
    const dbconnect=await mongo.connect('mongodb+srv://sairampallapothula:sai1234@cluster0.eoxchjo.mongodb.net/?retryWrites=true&w=majority',{dbName:'librarymanagement'})
    if(dbConnect)
    {
        console.log("database connected");
    }
    else
    {
        console.log("database notconnected");
    }
}
catch(exp)
{
    throw exp
}
}

module.exports=dbConnect;