import {Router} from 'express'
import * as controller from "../../controllers/client/cart.controller"
const router: Router = Router()

router.get("/", controller.index)
router.post("/list-json", controller.listJson)

export const cartRoutes: Router = router 