const express = require('express');
const router = express.Router();
const cors = require('cors');
const parser = require("body-parser");

router.use(cors());
router.use(parser.json());


const User__login=require("../schema/user__login");
const All__data=require("../schema/all__data");

router.post('/data',async(req,res)=>{
    const {name,link}=req.body;
    if(!name || !link){
        return res.status(422).json({error:"Fill All Data :) Properly"});
    }
    try {
        const data_pushed = await All__data.findOne({name:name});
        // console.log(data_pushed);
        const data= new All__data({name,link});
        if(data_pushed){
            res.status(422).json({message:`This Question Is Alredy Exist ${name}`})
        }
        else if(!data_pushed){
            await data.save();
            res.status(201).json({message:"Data Pushed"});
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/data',async(req,res)=>{
    try {
        const all_data=await All__data.find({})
        res.status(201).json(all_data);
    } catch (error) {
        res.status(422).json({message:error.message});   
    }
})

router.post('/signin',async(req,res)=>{
    // console.log(req.body)
    const{name,email,password,cpassword}=req.body;
    if(!name || !email || !password || !cpassword){
        return res.status(422).json({error:"Plz filled all filed correctly"});
    }
    else if(password!=cpassword){
        return res.status(422).json({error:"Password Must Be Matched !"})
    }
    try {
        const userExist = await User__login.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:`${email} is alredy exist`});
        }
        const user = new User__login({name,email,password,cpassword});
        await user.save();
        res.status(201).json({message:"User Register Succesfully"})
    } catch (error) {
        console.log(error);
    }
})
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:"Invalid Fill All Data Properly"});
    }
    try {
        const userlogin = await User__login.findOne({email:email});
        // console.log(userlogin);
            if(userlogin){
                if(password==userlogin.password){
                    return res.status(201).json({message:"User Login Succefully"});
                }
                else if(password!=userlogin.password){
                    return res.status(422).json({error:"Password Is Wrong"});
                }
            }
    } catch (error) {
        console.log(error);
    }
})

module.exports=router;
