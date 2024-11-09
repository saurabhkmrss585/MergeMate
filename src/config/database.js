const mongoose=require('mongoose');
const connectDb=async()=>{
    await mongoose.connect(
        "mongodb+srv://saurabhkmrss:57yk3REzwinHqq18@namastenode.ib43c.mongodb.net/mergeMate"
    );
}
module.exports=connectDb;