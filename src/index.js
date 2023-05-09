import express from "express";
import ProductRouter from "./router/products.routes.js";
import CartRouter from "./router/carts.routes.js";



const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)


        const server = app.listen(PORT, () => {
        console.log(`listening to PORT: http://localhost:${PORT}`)
})
app.get("*", (req, res) =>{
        return res.status(404).json(
                {
                        status: "error",
                        msg:"the route is not implemented",
                        data:{},
                }
        )
} )
