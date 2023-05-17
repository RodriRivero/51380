import { Router } from 'express'
import ProductManager from '../components/ProductManager.js'
import { uploader } from '../utils.js'

const router = Router()

router.get('/', async (req, res) => {
  const products = await ProductManager.getProducts()
  const limit = parseInt(req.query.limit)
  if (!limit) {
    return res.status(200).json(products)
  } else {
    if (limit > products.length) {
      return res.status(409).json({
        error: 'Invalid limit'
      })
    } else {
      return res.status(200).json(products.slice(0, limit))
    }
  }
})

router.get('/:pid', async (req, res) => {
  const idRequested = parseInt(req.params.pid)
  try {
    const userSearch = await ProductManager.getProductsById(idRequested)
    return res.status(200).json({
      success: true,
      userSearch
    })
  } catch (error) {
    res.status(400).json({
      error: 'Product id not found'
    })
  }
})

router.post('/realtimeproducts', uploader.single('thumbnails'), async (req, res) => {
  const productToAdd = req.body
  if (req.file) {
    productToAdd.thumbnails = `/thumbnails/${req.file.filename}`
  } else {
    productToAdd.thumbnails = '/thumbnails/placeholder.png'
  }
  const products = await ProductManager.addProduct(productToAdd)
  if (!products) {
    res.status(200).json({
      status: true,
      message: 'Product succesfully added'
    })
  } else {
    res.status(409).json({ error: products })
  }
})

router.put('/:pid', async (req, res) => {
  const idProduct = parseInt(req.params.pid)
  const newProduct = req.body
  const productModify = await ProductManager.updateProduct(idProduct, newProduct)
  if (!productModify) {
    res.status(200).json({
      status: true,
      message: 'Producto succesfully modified'
    })
  } else {
    res.status(409).json({ error: productModify })
  }
})

router.delete('/:pid', async (req, res) => {
  const idToDelete = parseInt(req.params.pid)
  const productEliminated = await ProductManager.deleteProduct(idToDelete)
  if (!productEliminated) {
    res.status(200).json({
      status: true,
      message: 'Producto succesfully deleted'
    })
  } else {
    res.status(409).json({ error: productEliminated })
  }
})

export default router