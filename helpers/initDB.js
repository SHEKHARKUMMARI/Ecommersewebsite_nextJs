import mongoose from 'mongoose';
// 2vkCQ8dXFibgCcQ
function initDB(){
    if(mongoose.connections[0].readystate){
        console.log("already connected")
        return
    }
  mongoose.connect(process.env.MOGO_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('connected',()=>{
        console.log("connection to mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("error connecting",err)
    })
}
export default initDB