const express=require('express');
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");

app.use(express.json());

app.post("/signUp",async(req,res)=>{
    //creating new instance of user model
    const user=new User(req.body); 
    try{
    await user.save();
    res.send("hi user data saved");
    }catch(err){
     res.status(400).send("there waserror in saving databse"+err.message);
    }
})

//get user by email
app.get("/user",async(req,res)=>{
  try{
    const userEmail=req.body.emailId;
    const users=await User.find({emailId:userEmail})
    if(users.length===0){
       res.status(404).send("user not found")
    }else{
        res.send(users)
    }
  }catch(err){
    res.send("there was error in receiving message")
  }
});


//feed api-get all the data from the database
app.get("/feed",async(req,res)=>{
     try{
        const users=await User.find({})
        res.send(users);
     }catch(err){
        res.send("there was error in receiving message")
     }



})
//delete a user
app.delete("/user",async(req,res)=>{
const userId=req.body.Id;
const user=await User.findByIdAndDelete(userId)
res.send("user deleted successful");
})
//update data of the user


app.patch("/user",async(req,res)=>{
    
  try{
    const userId=req.body._id;
    const data=req.body;
    const ALLOWED_UPDATES=[
      "photoUrl","about","age","gender","skills","_id"
    ];
    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    console.log(isUpdateAllowed);
    if(!isUpdateAllowed){
      throw new Error("updates not allowed");
    }
    if(data?.skills?.length>10){
      throw new Error("updates not allowed");
    }
    
   const user= await User.findByIdAndUpdate({_id:userId},data,{
   returnDocument:"after",
   runValidators:"true",
   });
   res.send("id updated successfully");

  } catch(err){
    res.status(404).send("something went wrong");
  }
});



  connectDB()
.then(()=>{
    console.log("database connected successful");
    app.listen(7777,()=>{ 
        console.log("congrats your server is running ");
    });
    
}).catch((err)=>{
    console.log("database not connected");
});


