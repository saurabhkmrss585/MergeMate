const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        },
        required:true,
    }
       
},{
    timestamps:true,
}
);

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if fromId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("canntot sent request to yourself");
    }
  next();
})







const connectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=connectionRequestModel;
