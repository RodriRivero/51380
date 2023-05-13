import express from "express";
import ProductRouter from "./router/products.routes.js";
import CartRouter from "./router/carts.routes.js";
import {Server} from "socket.io";
import {testSocketRouter} from "./router/test.socket.routes.js";
import handlebars from "express-handlebars";
import path from "path";
import {__dirname} from "./utils.js";
import { initSockets } from "./socket/socketServer.js";


const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`listening to PORT: http://localhost:${PORT}`)
})


initSockets(httpServer)



app.use("/test-socket", testSocketRouter);


app.get("*", (req, res) => {
    return res.status(404).json({status: "error", msg: "the route is not implemented", data: {}})
})
