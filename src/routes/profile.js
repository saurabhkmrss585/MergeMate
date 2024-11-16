const express=require("express");
const profileRouter=express.Router();
const{userAuth}=require("../middlewares/auth");
const User=require("../models/user");
const{validateProfileEditData}=require('../utils/validation');


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
     const user=req.user;
    if(!user){
      throw new Error("user does not exist");
    }
    res.send(user);
    
    }catch(err){
      res.status(404).send("ERROR"+err.message);
    }
    });


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
   try{
  
    if(!validateProfileEditData(req)){
      throw new Error("invalid edit request");

    }
    const loggedUser=req.user;
     Object.keys(req.body).forEach((key)=>(loggedUser[key]=req.body[key]));
     await loggedUser.save();
     res.json({
      message:`${loggedUser.firstName},your profle updated sucefully`,
      data:loggedUser,
     })

   }catch(err){
    res.status(400).send(err.message+"there was error in updating your profile")
   }




 })





module.exports=profileRouter;

