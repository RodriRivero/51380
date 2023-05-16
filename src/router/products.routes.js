import { Router } from "express"; 
import ProductManager from "../components/ProductManager.js";
//import { uploader } from "../utils.js";



const router = Router()
const product = new ProductManager();

router.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (! limit) 
        return res.json({
            status: "success",
            msg:"list of all products",
            data:await product.getProducts()})
    
    let allProducts = await product.getProducts();
    let productLimit = allProducts.slice(0, limit)

    res.send(productLimit)
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let allProducts = await product.readProducts();
    let getProductById = allProducts.find(product => product.id === id)
    if (getProductById) {
        return res.status(200).json({
            status: "success",
            msg: "product obtained by id: " + id,
            data:await product.getProductById(id),
        })
    } else {
        return res.status(400).json({
            status: "error",
            msg: "error:  could not find id: " + id,
            data:{},
        });
    }
});

router.post("/", async (req, res) => {
let newProduct = req.body;
    res.status(201).json({
            status: "success",
            msg:await product.addProduct(newProduct)
        })
})

/*router.post('/', uploader.single('thumbnails'), async (req, res) => {
    const productToAdd = req.body
    if (req.file) {
      productToAdd.thumbnails = `/thumbnails/${req.file.filename}`
    } else {
      productToAdd.thumbnails = '/thumbnails/placeholder.png'
    }
    const product = await ProductManager.addProducts(productToAdd)
    if (!product) {
      res.status(200).json({
        status: true,
        message: 'Product succesfully added'
      })
    } else {
      res.status(409).json({ error: product })
    }
  })*/






  router.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.status(200).json({
            status:"success",
            msg:await product.deleteProduct(id)})
})

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let updateProducts = req.body;
    res.send( await product.updateProducts(id, updateProducts));
        
})

export default router
