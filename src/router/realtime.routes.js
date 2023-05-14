

import { Router } from 'express'
import ProductManager from "../components/ProductManager.js";

const router = Router()

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await ProductManager.getProducts()
    res.status(200).render('realTimeProducts', { name: 'Pagina WebSocket', products })
  } catch (err) {
    res.status(400).json({
      error: 'Could not get the product list'
    })
  }
})

export default router

