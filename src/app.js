const express=require('express');
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
const{signUpValidation}=require('./utils/validation')
const bcrypt=require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt=require("jsonwebtoken");
const{userAuth}=require("./middlewares/auth")


app.use(express.json());
app.use(cookieParser());


app.post("/signUp",async(req,res)=>{
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
})

app.post("/login",async(req,res)=>{
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

app.get("/profile",userAuth,async(req,res)=>{
try{
 const user=req.user;
if(!user){
  throw new Error("user does not exist");
}
res.send(user);

}catch(err){
  res.status(404).send("ERROR"+err.message);
}
})
 
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;
  console.log(user.firstName+"is sending request");
  res.send(user.firstName+"is sending request");
})




  connectDB()
.then(()=>{
    console.log("database connected successful");
    app.listen(7777,()=>{ 
        console.log("congrats your server is running ");
    });
    
}).catch((err)=>{
    console.log("database not connected");
});


