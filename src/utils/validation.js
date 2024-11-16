const validator=require('validator');
const signUpValidation=(req)=>{
   const{firstName,lastName,emailId,password}=req.body;
   if(!firstName&&!lastName){
    throw new Error("firstname and lastname can not be empty");
   }
   else if(!validator.isEmail(emailId)){
    throw new Error("inavalid emailID");
   }   
   else if(!validator.isStrongPassword(password)){
   throw new Error("password is not strong");
   }
};

const validateProfileEditData=(req)=>{
   const allowedEditField=[
   "firstName",
   "lastName",
    "photoUrl",
    "about",
    "gender",
    "skills",
    "age",
   ];
     const isallowed=Object.keys(req.body).every((field)=>allowedEditField.includes(field));
  
     return isallowed;
 }
 
module.exports={signUpValidation,validateProfileEditData}; 