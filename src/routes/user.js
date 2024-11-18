const express=require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
    const loggedInUser=req.user;
    const connectionRequests=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested",
    }).populate("fromUserId","firstName lastName photoUrl age gender skills about");

    if(connectionRequests){
    res.json({
        message:"data fetched successfully",
        data:connectionRequests,
    });
}
    else{
        res.send("no connection request")

    }

     }catch(err){
        res.status(400).send("ERROR"+err.message);
     } 
});
userRouter.get("/user/requests/allconnections",userAuth,async(req,res)=>{
    try{   
    const loggedInUser=req.user;
       const allconnections= await ConnectionRequest.find({
      $or:[
        {toUserId:loggedInUser._id,status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"},
      ]
       }).populate("fromUserId","firstName lastName age gender about skills ")
       .populate("toUserId","firstName lastName age gender about skills")
      const data=allconnections.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
      });
      res.json({data});
    }catch(err){
        res.status(400).send({message:err.message});
    }

    })
userRouter.get("/user/feed",userAuth,async(req,res)=>{
   try{
    //0.except his own card
    //1.his connection
    //2.ignored card
    //3.already sent the connection request
   const loggedInUser=req.user;
   //find all connection request which i had sent or received 
   const connectionRequest=await ConnectionRequest.find({
    $or:[
        {fromUserId:loggedInUser._id},
        {toUserId:loggedInUser._id},
    ]
   }).select("fromUserId toUserId");
   const hideUserFeed=new Set();
   connectionRequest.forEach((req)=>{
    hideUserFeed.add(req.fromUserId.toString());
    hideUserFeed.add(req.toUserId.toString());
   });
  const users=await User.find({
    $and:[
        {_id:{$nin:Array.from(hideUserFeed)}},
        {_id:{$ne:loggedInUser._id}},
  ],}).select("firstName lastName age gender about skills ");

res.send(users);


   }catch(err){
     res.status(400).json({message:err.message});
   }

})

module.exports=userRouter;



