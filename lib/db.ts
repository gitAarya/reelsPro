import mongoose from "mongoose";
const MONGODB_URL= process.env.MONGODB_URL!;

if(!MONGODB_URL){
    throw new Error("please define mongoDb url in .env ")
}
let cached = global.mongoose;
if(!cached){
    cached= global.mongoose={conn:null,promise:null}
}
export async function connectToDatabase () {
    if(cached.conn){ // if connection is found then return teh connection
        return cached.conn
    }
    if(!cached.promise){
        //Checks if there's no pending connection promise ........ connection nahi huwa hai toh
        const opts={
            bufferCommands:true, // buffers commands when not connected
            maxPoolSize:10,
            dbName: 'reelsPro',
        }
        cached.promise=mongoose.connect(MONGODB_URL,opts).then(()=>{
            return mongoose.connection
        })
    }

    // if connection id sent but promise is not returned yet
         
    try {
        cached.conn= await cached.promise
        
    } catch (error) {
        cached.promise=null
        throw new Error(`db connection failed ${error}`)
    }
   return cached.conn
}