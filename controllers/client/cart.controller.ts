import {Request, Response} from 'express'
import Category from '../../models/category.model'

// [GET]: /cart
export const index = async (req:Request, res:Response)=>{

  res.render("client/pages/cart/index",{ 
    pageTitle: "Giỏ hàng",
  })
}