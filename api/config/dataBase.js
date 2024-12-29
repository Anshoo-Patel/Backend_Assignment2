const mongoose=require('mongoose');

require("dotenv").config();
const dbConnet=()=>
{
    mongoose.connect(process.env.url)
    .then(()=> console.log("CONNECTED TO Database"))
    .catch((err)=>{
        console.log("ISSUE IN CONNECTING");
    })
}

module.exports=dbConnet;