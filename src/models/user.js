const mongoose  = require("mongoose");
const validator = require("validator");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const userSchema=mongoose.Schema({
    firstName:{
        type:"string",
        required:true,
        minLength:"4",
        maxLength:"50",
    },
    lastName:{
        type:"string",
        minLength:4,
        maxLength:50,
     
    },
    emailId:{
        type:"string",
        lowercase:"true",
        required:"true",
        unique:true,
        trim:"true",
        // validate(value){
        //     if(!validator.isEmail(value)){
        //          throw new Error("email is not valid"+ value)
        //     }
        // }
    },
    age:{
        type:"Number",
        min:18,
        max:50,
    },
    gender:{
        type:"string",
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    password:{
        type:"string",
        required:"true",
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is very weak");
            }

        }
    },
    photoUrl:{
    type:"string",
    //  validate(value){
    //     if(!validator.isURL(value)){
    //         throw new Error("please upload image url not any other url"); 
    //     }
    //  }
    },

    about:{
        type:"string",
        default:"you are not up to mark for getting dated! "
    },
    skills:{
        type:["string"],
    }

},{
    timestamps:true,
});

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id},"DEV@Tinder123",{
        expiresIn:"7d",
    })
return token;
}
userSchema.methods.validatePassword=async function(userPassword){
    const user=this;
    const hashPassword=user.password;
    ispassValid=bcrypt.compare(userPassword,hashPassword)
    return ispassValid;

}




module.exports=mongoose.model("user",userSchema);
