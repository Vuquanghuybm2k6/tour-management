import express, {Express}from "express"
import dotenv from "dotenv"
dotenv.config()
import clientRoutes from "./routes/client/index.route"
import bodyParser from "body-parser"
import moment from "moment"
import adminRoutes from "./routes/admin/index.route"
import { systemConfig } from "./config/system"
const app: Express = express()
const port:number|string =  process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static("public"))

app.set("views", "./views")
app.set("view engine", "pug")

// App Locals Variables
app.locals.moment = moment
app.locals.prefixAdmin = systemConfig.prefixAdmin

clientRoutes(app)
adminRoutes(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});