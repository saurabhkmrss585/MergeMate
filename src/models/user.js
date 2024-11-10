const mongoose  = require("mongoose");
const validator = require("validator");
const userSchema=mongoose.Schema({
    firstName:{
        type:"string",
        required:true,
        minLength:"4",
        maxLength:"50",
    },
    lastName:{
        type:"string",
    },
    emailId:{
        type:"string",
        lowercase:"true",
        required:"true",
        unique:true,
        trim:"true",
        validate(value){
            if(!validator.isEmail(value)){
                 throw new Error("email is not valid"+ value)
            }
        }
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
     validate(value){
        if(!validator.isURL(value)){
            throw new Error("please upload image url not any other url"); 
        }
     }
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

module.exports=mongoose.model("user",userSchema);
