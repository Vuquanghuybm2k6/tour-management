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
interface OrdersItem {
  orderId: number,
  tourId: number,
  quantity: number,
  price: number,
  discount: number,
  timeStart: number,
  price_special?: number,
  total?: number,
  title?: string,
  slug?: string,
  image?: string
}
// [POST]: /order
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
  const orderCode = req.query.orderCode
  const order = await Order.findOne({
    where:{
      code: orderCode,
      deleted: false
    },
    raw: true
  }) as unknown as { id: number; code: string; deleted: boolean; [key: string]: any } | null;
  if (!order) {
    return res.status(404).send("Order not found");
  }

  const ordersItem = await OrderItem.findAll({
    where: {
      orderId: order.id
    },
    raw: true
  }) as unknown as OrdersItem[];
  for(const item of ordersItem){
    item.price_special = item.price * (1 - item.discount / 100);
    item.total = item.price_special * item.quantity;

    const tourInfo = await Tour.findOne({
      where: {
        id: item.tourId
      },
      raw: true
    }) as { title: string; slug: string; images: string } | null;
    if (tourInfo) {
      item.title = tourInfo.title;
      item.slug = tourInfo.slug;
      item.image = JSON.parse(tourInfo.images)[0];
    }
  }
  const totalPrice = ordersItem.reduce((sum, item)=> sum + (item.total ?? 0), 0);
  const orderData = {
    ...order,
    total_price: totalPrice
  };

  console.log(orderData)
  console.log(ordersItem)
  res.render("client/pages/order/success",{
    pageTitle: "Đặt hàng thành công",
    order: orderData,
    ordersItem
  })
 }