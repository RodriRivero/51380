import express from "express";
import ProductManager from "./src/components/ProductManager.js";

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
    let id = parseInt(req.params.id);
    let allProducts = await getProducts;
    let getProductById = allProducts.find(product => product.id === id)
    if (getProductById) {
        return res.status(200).send(getProductById);
    } else {
        return res.status(400).json({
            error: " could not find id: " + id
        });
    }
});


const server = app.listen(PORT, () => {
    console.log(`listening to PORT: http://localhost:${PORT}`)
})
