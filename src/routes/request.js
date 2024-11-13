const express=require("express");
const requestRouter=express.Router();
const{userAuth}=require("../middlewares/auth");
requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;
    console.log(user.firstName+"is sending request");
    res.send(user.firstName+"is sending request");
  });
  
  







module.exports=requestRouter;