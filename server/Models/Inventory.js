import mongoose from "mongoose";
const InventorySchema=new mongoose.Schema({
  productName:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  supplier:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true,
    min:0
  },
  stock:{
    type:Number,
    required:true
  },
  soldQuntity:{
    type:Number,
    required:true
  },
  reorderLevel:{
    type:Number,
    required:true
  },
  warehouse:{
    required:true,
    type:String
  }
})
const Inventory=new mongoose.model("Inventory",InventorySchema);

export default Inventory;