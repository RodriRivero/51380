import { Router } from 'express'
import cartRouter from './carts.routes.js'
import ProductRouter from './products.routes.js'

const router = Router()

router.use('/products', ProductRouter)
router.use('/cart', cartRouter)

export default router