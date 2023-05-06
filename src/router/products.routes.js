import { Router } from "express"; 
import ProductManager from "../components/productManager.js";

const ProductRouter = Router()
const product = new ProductManager();

ProductRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (! limit) 
        return res.send(await product.getProducts())
    
    let allProducts = await getProducts();
    let productLimit = allProducts.slice(0, limit)

    res.send(productLimit)
});

ProductRouter.get("/:id", async (req, res) => {
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

ProductRouter.post("/", async (req, res) => {
let newProduct = req.body
    res.status(200).send(await product.addProducts(newProduct))
})

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.status(200).send( await product.deleteProduct(id))
})

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id;
    let updateProducts = req.body;
    res.send( await product.updateProducts(id, updateProducts));
        
})

export default ProductRouter