import express, {Express}from "express"
import dotenv from "dotenv"
dotenv.config()
import clientRoutes from "./routes/client/index.route"
import bodyParser from "body-parser"
import moment from "moment"

const app: Express = express()
const port:number|string =  process.env.PORT || 3000
app.use(bodyParser.json())
app.use(express.static("public"))

app.set("views", "./views")
app.set("view engine", "pug")

// App Locals Variables
app.locals.moment = moment
clientRoutes(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});