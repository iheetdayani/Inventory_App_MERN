import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import InventoryRoutes from "./Routes/InventoryRoutes.js";
dotenv.config();
connectDb();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/Inventory",InventoryRoutes);
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
  console.log(`server is running on PORT ${PORT}`);
})