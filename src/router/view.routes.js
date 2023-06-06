import { Router } from 'express'
import ProductManager from '../dao/ProductManager.js'
import realTimeRouter from './realtime.routes.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const products = await ProductManager.getProducts()
    res.status(200).render('home', {  name: ' lista de Productos', products })
  } catch (err) {
    res.status(400).json({
      error: 'Could not get the product list'
    })
  }
})

router.use('/', realTimeRouter)

export default router