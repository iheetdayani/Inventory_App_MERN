import mongoose from "mongoose";
const connectDb=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected SuccessFully");
  }catch(error){
    console.log("error while connect with the Database");
    console.log(error);
  }
}
export default connectDb;