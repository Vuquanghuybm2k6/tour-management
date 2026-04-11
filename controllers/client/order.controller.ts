import {Request, Response} from 'express'
import Order from '../../models/order.model'
import { generateOrderCode } from '../../helpers/generate'

// [GET]: /orders
export const order = async (req:Request, res:Response)=>{
  const data = req.body
  // Save data into orders table
  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial"
  }
  const order = await Order.create(dataOrder)
  const orderId = order.dataValues.id
  const code = generateOrderCode(orderId)
  await Order.update({
    code: code
  },{
    where:{
      id: orderId
    }
  })
  console.log(order)
  res.json({
    code:200,
    message: "Đặt hàng thành công",
    orderCode: code
  })
}