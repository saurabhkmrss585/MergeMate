const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAuthorized=token==="xyz";
    if(!isAuthorized){
        res.send("sorry u are not authorized")
    }
    else{
        next()
    }

}

const userAuth=(req,res,next)=>{
    const token="xyz";
    const isAuthorized=token==="xyz";
    if(!isAuthorized){
        res.send("sorry u are not authorized")
    }
    else{
        next()
    }
}
module.exports={
    adminAuth,userAuth
}