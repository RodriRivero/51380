import express from "express";
import ProductManager from "./components/productManager.js";



const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const product = new ProductManager();

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (! limit) 
        return res.send(await product.getProducts())
    
    let allProducts = await getProducts();
    let productLimit = allProducts.slice(0, limit)

    res.send(productLimit)
});

app.get("/products/:id", async (req, res) => {
    let id = req.params.id;
    let allProducts = await product.readProducts();
    let getProductById = allProducts.find(product => product.id === id)
    if (getProductById) {
        return res.status(200).send(await product.getProductById(id));
    } else {
        return res.status(400).json({
            error: " could not find id: " + id
        });
    }
});

app.post("/products", async (req, res) => {
    let newProduct = req.body
    res.status(200).send(await product.addProducts(newProduct))
})

app.delete("/products/:id", async (req, res) => {
    let id = req.params.id
    res.status(200).send( await product.deleteProduct(id))
})

app.put("/products/:id", async (req, res) => {
    let id = req.params.id;
    let productUpdate = req.body;
    res.send( await product.productUpdate(id, productUpdate()));
        
})


const server = app.listen(PORT, () => {
        console.log(`listening to PORT: http://localhost:${PORT}`)
})
