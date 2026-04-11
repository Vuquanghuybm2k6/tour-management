import {Router} from 'express'
import * as controller from "../../controllers/client/order.controller"
const router: Router = Router()

router.post("/", controller.order)
router.get("/success", controller.success)


export const orderRoutes: Router = router 