import { Router } from 'express'
import  cartsRouter  from './carts.router.js'
import  ProductRouter from './products.router.js'


const router = Router()

router.use('/products', ProductRouter)
router.use('/cart', cartsRouter)

export default router