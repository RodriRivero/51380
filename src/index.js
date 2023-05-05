import express from "express";
import ProductManager from "./components/ProductManager.js";
import { async } from "rxjs";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const products = new ProductManager()
const getProducts = products.getProducts()

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (! limit) 
        return res.send(await getProducts)
    
    let allProducts = await getProducts;
    let productLimit = allProducts.slice(0, limit)

    res.send(productLimit)
});

app.get("/products/:id", async (req, res) => {
    let id = req.params.id;
    let allProducts = await getProducts;
    let getProductById = allProducts.find(product => product.id === id)
    if (getProductById) {
        return res.status(200).send(await products.getProductById(id));
    } else {
        return res.status(400).json({
            error: " could not find id: " + id
        });
    }
});

app.post("/products", async (req, res) =>{
    let newProduct = req.body
    res.send(await products.addProduct(newProduct))
})

app.delete("/products/:id", async (req, res) =>{
    let id = req.params.id
    res.send( await products.deleteProduct(id))
})



const server = app.listen(PORT, () => {
        console.log(`listening to PORT: http://localhost:${PORT}`)
})
