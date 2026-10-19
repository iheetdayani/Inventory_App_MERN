import Inventory from "../Models/Inventory.js";
const createProduct=async(req,res)=>{
  try{
    const data=await Inventory.create(req.body);
    res.status(201).json({
      data:data,
      message:"Product Created SuccessFully"
    })
  }catch(error){
    res.status(400).json({
      meesage:"error while creating the product"
    })
  }
}
const DeleteProduct=async(req,res)=>{
  try{
    const data=await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data:data,
      message:"Product Deleted SuccessFully"
    })
  }catch(error){
    res.status(400).json({
      meesage:"error while Deleteing the product"
    })
  }
}
const GetAllproduct=async(req,res)=>{
  try{
    const data=await Inventory.find();
    res.status(200).json({
      data:data,
      message:"Product Fetched SuccessFully"
    })
  }catch(error){
    res.status(400).json({
      meesage:"error while Fetching the product"
    })
  }
}
const updateProduct=async(req,res)=>{
  try{
    const data=await Inventory.findByIdAndUpdate(req.params.id,req.params.body,{new:true,runValidators:true});
    res.status(200).json({
      data:data,
      message:"Product Update SuccessFully"
    })
     if (!data) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
  }catch(error){
    res.status(400).json({
      meesage:"error while updating the product"
    })
  }
}
const GetAllproductById=async(req,res)=>{
  try{
    const data=await Inventory.findById(req.params.id);
    res.status(200).json({
      data:data,
      message:"Product Fetched SuccessFully By Id"
    })
  }catch(error){
    res.status(400).json({
      meesage:"error while Fetching the product By Id"
    })
  }
}
export {createProduct,DeleteProduct,GetAllproduct,updateProduct,GetAllproductById}