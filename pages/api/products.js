import Product from "../product/[id]";
import initDB from "../../helpers/initDB";
import product from "../../models/product"
initDB()
export default async (req,res)=>{
  switch (req.method)
  {
    case "GET" :
      await getallProducts(req,res);
      break;
    case "POST" :
      await saveProduct(req,res);
      break;
  }
} 
const getallProducts = async (req,res)=>{
  product.find().then(products=>{
    res.status(200).json(products)
  })
}
const saveProduct=async (req,res)=>{
const {name,price,description,mediaUrl}=req.body
if(!name || !price || !description || !mediaUrl)
{
  return res.status(422).json({error:"please add all the fields"})
}
const product = await new Product({
  name,
  price,
  description,
  mediaUrl
}).save()
res.status(201).json(product)
}