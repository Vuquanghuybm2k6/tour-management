import {Request, Response} from 'express'
import Order from '../../models/order.model'
import Tour from '../../models/tour.model'
import { generateOrderCode } from '../../helpers/generate'
import OrderItem from '../../models/order-item.model'
interface DataItem {
  orderId: number,
  tourId: number,
  quantity: number,
  price?: number,
  discount?: number,
  timeStart?: number
}
interface InfoTour{
  price: number,
  discount: number,
  timeStart: number
}
// [POST]: /orders
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
  // Save data into orders_item table
  for(const item of data.cart){
    const dataItem: DataItem = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity
    }
    const infoTour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active"
      },
      raw: true
    }) as InfoTour | null;
    if(!infoTour) continue
    dataItem["price"] = infoTour["price"]
    dataItem["discount"] = infoTour["discount"]
    dataItem["timeStart"] = infoTour["timeStart"]
    await OrderItem.create(dataItem as any)
  }
  res.json({
    code:200,
    message: "Đặt hàng thành công",
    orderCode: code
  })
}

// [GET]: /order/success
 export const success = async(req: Request, res: Response)=>{
  res.render("client/pages/order/success",{
    pageTitle: "Đặt hàng thành công"
  })
 }