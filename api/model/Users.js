const mongoose=require('mongoose');


const userschema=new mongoose.Schema({
    firstName:
    {
        type:String,
        required:true,
    },
    lastName:
    {
        type:String,
        required:true
    },
    hobby:
    {
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Users",userschema);