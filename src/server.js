
import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const products = new ProductManager()
const getProducts = products.getProducts()

console.log(await getProducts)
/*app.get("/", (req, res) => {
res.send("Mocchhhh");
});


app.listen(PORT, () => {
    console.log(`listening to PORT: http://localhost:${PORT}`)
});*/
