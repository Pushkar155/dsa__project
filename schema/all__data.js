const mongoose = require('mongoose');

const all__data = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    }
})
const All__data=mongoose.model("all__data",all__data);
module.exports=All__data;
