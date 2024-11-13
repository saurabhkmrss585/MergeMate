const express=require("express");
const profileRouter=express.Router();
const{userAuth}=require("../middlewares/auth");
const User=require("../models/user");



profileRouter.get("/profile",userAuth,async(req,res)=>{
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

module.exports=profileRouter;

