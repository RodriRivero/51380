import express from "express";
import ProductRouter from "./router/products.routes.js";
import CartRouter from "./router/carts.routes.js";



const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/products", ProductRouter)
app.use("/carts", CartRouter)


        const server = app.listen(PORT, () => {
        console.log(`listening to PORT: http://localhost:${PORT}`)
})

