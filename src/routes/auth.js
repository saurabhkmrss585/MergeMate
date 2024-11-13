const express=require("express");
const authRouter=express.Router();
const{signUpValidation}=require('../utils/validation');
const User=require("../models/user");
const cookieParser = require('cookie-parser');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")



authRouter.post("/signUp",async(req,res)=>{
    try{
      //validation of data 
      signUpValidation(req);
      const{firstName,lastName,emailId,password}=req.body;
  
     //encrypt the password 
      const hashPassword=await bcrypt.hash(password,10);
  
  
      //creating new instance of user model
      const user=new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword,
      }); 
      
      await user.save();
      res.send("hi user data saved");
      }catch(err){
       res.status(400).send("ERROR:"+err.message);
      }
  });

authRouter.post("/login",async(req,res)=>{
    try{
     const{emailId,password}=req.body;
     const user= await User.findOne({emailId:emailId})
     if(!user){
       throw new Error("wrong email")
     }
     const ispassValid=await user.validatePassword(password)
     if(ispassValid){
      //create a jwt token
     const token=await  user.getJWT();
     //console.log(token);
      //add the token to cookie and send reposnse back to user 
      res.cookie("token",token);
     return res.send("login successfull");
      
     }else{
       throw new Error("wrong password")
     }
     
 
    }catch(err){
     res.status(404).send("ERROR"+err.message);
    }
 }
 );


 module.exports=authRouter;