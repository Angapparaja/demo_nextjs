import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function dbConnect(){
    if(isConnected) return;

    if(!MONGODB_URI) throw new Error("MONGODB_URI not found in .env");

    try {
        await mongoose.connect( MONGODB_URI, {
            dbName:"demo",
        });
        isConnected= true;
        console.log("MONGODB CONNECTED");
    } catch(err){
        console.error("MONGODB CONNECTION FAILED",err)
    }
}