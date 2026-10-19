import express from "express";
import { DeleteProduct,GetAllproduct,createProduct,updateProduct,GetAllproductById } from "../Controller/InventoryController.js";
const router=express.Router();

router.post("/",createProduct);
router.get("/",GetAllproduct);
router.get("/:id",GetAllproductById);
router.delete("/:id",DeleteProduct);
router.put("/:id",updateProduct);

export default router;