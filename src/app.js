const express=require('express');
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");

app.post("/signUp",async(req,res)=>{
    //creating new instance of user model
    const user=new User({
        firstName:"gaurav",
        lastName:"kumar",
        emailId:"saurabhkmrss585@gmail.com",
        password:"767868",
    }); 
    try{
    await user.save();
    res.send("hi user data saved");
    }catch(err){
     res.status(400).send("there waserror in saving databse"+err.message);
    }
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


