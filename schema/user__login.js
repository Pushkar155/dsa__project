const mongoose = require('mongoose');

const user__login = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    }
})
const User__login=mongoose.model("user_login",user__login);
module.exports=User__login;
