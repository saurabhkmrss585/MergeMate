const express=require('express');
const app=express();





app.listen("7777",()=>{
    console.log("congrats your server is running ");
})
app.use("/hello",(req,res)=>{
    res.send("hi i am responding on hello");
})
app.use("/test",(req,res)=>{
    res.send("hi i am responding from test ")
})