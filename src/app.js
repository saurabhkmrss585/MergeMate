const express=require('express');
const app=express();

app.listen("7777",()=>{ 
    console.log("congrats your server is running ");
})

app.use("/user",(req,res,next)=>{
   // res.send("Hi i am first route handler")
    next();
},
(req,res,next)=>{
    //res.send("hi i am second route handler ");
    next();

},
(req,res)=>{
    res.send("hi i am third route handler");
}
)