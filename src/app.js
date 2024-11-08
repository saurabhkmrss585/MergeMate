const express=require('express');
const app=express();
const {adminAuth,userAuth}=require('./middlewares/auth')


app.use("/admin",adminAuth);
app.get("/admin/getAllData",(req,res)=>{
    res.send("hi u are authorized to see the data");
});
app.use("/user",userAuth,(req,res)=>{
    res.send("user is authorized")
})
app.get("/admin/deleteData",(req,res)=>{
    res.send("hi u are authorized to delete the data");
});


app.listen(7777,()=>{ 
    console.log("congrats your server is running ");
});
