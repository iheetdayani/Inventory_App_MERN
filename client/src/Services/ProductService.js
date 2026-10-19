import axios from "axios";

const API_URL="http://localhost:5000/api/Inventory";

export const createproduct=async(Inventory)=>{
  const response=await axios.post(API_URL,Inventory);
  return response.data;
}
export const GetAllproducts=async()=>{
  const response=await axios.get(API_URL);
  return response.data;
}

export const GetAllproductsById=async(id)=>{
  const response=await axios.get(`${API_URL}/${id}`);
  return response.data;
}
export const DeleteProduct=async(id)=>{
  const response=await axios.delete(`${API_URL}/${id}`);
  return response.data;
}