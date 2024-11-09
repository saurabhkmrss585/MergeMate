const mongoose  = require("mongoose");
const userSchema=mongoose.Schema({
    firstName:{
        type:"string"
    },
    lastName:{
        type:"string"
    },
    emailId:{
        type:"string"
    },
    age:{
        type:"Number"
    },
    gender:{
        type:"string"
    },
    password:{
        type:"Number"
    }

});

module.exports=mongoose.model("user",userSchema);
