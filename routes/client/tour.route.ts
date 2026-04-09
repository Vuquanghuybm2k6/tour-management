import {Router, Request, Response} from 'express'
import Tour from '../../models/tour.model'
const router: Router = Router()

router.get("/", async (req:Request, res:Response)=>{
  const tours = await Tour.findAll({
    raw: true
  })
  console.log(tours)
  res.render("client/pages/tours/index",{ 
    tours
  })
})


export const tourRoutes: Router = router 