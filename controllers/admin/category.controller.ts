import {Request, Response} from 'express'
import Category from '../../models/category.model'

// [POST]: /admin/categories
export const index = async (req:Request, res:Response)=>{
  const categories = await Category.findAll({
    where: {
      deleted: false
    },
    raw: true
  })
  res.render("admin/pages/categories/index",{
    pageTitle: "Danh mục tour",
    categories
  })
 }