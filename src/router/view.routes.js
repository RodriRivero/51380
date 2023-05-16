import { Router } from 'express'
import ProductManager from '../components/ProductManager.js'
import realTimeRouter from './realtime.routes.js'

const router = Router()

router.get('/', async (req, res) => {
  //try {
    //const products = await ProductManager.readProducts()
    res.status(200).render('home' )
 // } catch (err) {
    //res.status(400).json({
     // error: 'Could not get the product list'
    //})
  //}
})

router.use('/', realTimeRouter)

export default router