const express=require("express");
const requestRouter=express.Router();
const{userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");
requestRouter.post("/request/sent/:status/:toUserId",userAuth,async(req,res)=>{
  try{
      const fromUserId=req.user._id;    
      const toUserId=req.params.toUserId;
      const status=req.params.status;
      const allowedStatus=["ignored","interested"];
      if(!allowedStatus.includes(status)){
        throw new Error("status does not match")
      }




    const existingConnectionRequest=await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId},
      ],
    });
      if(existingConnectionRequest){
        return res.status(400).send({message:"connection request already exist"})
      }
     const toUser=await User.findById(toUserId);
     if(!toUser){
      return res.status(404).json({message:"user not found"});
     } 
      const connectionRequest=new ConnectionRequest({
        fromUserId,toUserId,status
      })
      const data=await connectionRequest.save();
  
      res.json({
        message:req.user.firstName+"is"+status+"in"+toUser.firstName,
        data,
      });

  } catch(err){
    res.status(400).send("ERROR:"+err.message);
  }

  });


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
try{
const loggedInUser=req.user;
  










}catch(err){
  res.status(400).json({
    message:("ERROR:"+err.message),
  })
}







});



module.exports=requestRouter;