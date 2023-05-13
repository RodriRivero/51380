import { Router } from 'express'
import cartRouter from './carts.routes.js'//cambiar por 
import ProductRouter from './products.routes.js'// cambiar por  

const router = Router()

router.use('/products', ProductRouter)
router.use('/cart', cartRouter)

export default router