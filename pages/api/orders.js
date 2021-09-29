import Authenticated from '../../helpers/Authenticated'
import Order from '../../models/Order'
import initDb from '../../helpers/initDB'

initDb()



export default Authenticated(async (req,res)=>{
  const orders =   await Order.find({user:req.userId})
     .populate("products.product")
  res.status(200).json(orders)
})
