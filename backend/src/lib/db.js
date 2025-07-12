import mongoose from "mongoose"

export const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(conn.connection.host);
        console.log(conn.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}