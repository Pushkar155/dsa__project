const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose=require('mongoose');
const PORT =3002;


require('dotenv').config();
app.use(require("./router/auth"));
app.get('/',(req,res)=>{
    res.send("Hello ji");
})
app.get('/',(req,res)=>{
    res.send("Hello")
})

mongoose.connect(process.env.DB).then(()=>{
    console.log(`connection succesfull to mongoose :)`);
}).catch((error)=>console.log(error));

app.listen(PORT,()=>{
    console.log(`running on ${PORT}`);
});
