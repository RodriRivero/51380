import { Router } from 'express'
import cartManager from '../components/CartManager.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const cart = await cartManager.createCart()
    res.status(201).json({
      message: 'Cart created succesfully',
      cart
    })
  } catch (error) {
    res.status(400).json({
      error: 'Error creating cart'
    })
  }
})

router.get('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartManager.getCartById(cid)
    res.status(200).json(cart.products)
  } catch (error) {
    res.status(400).json({
      error: 'Cart not found'
    })
  }
})

router.put('/:cid/:pid', async (req, res) => {
  const { cid, pid } = req.params
  try {
    const productToAdd = await cartManager.addProductsToCart(cid, pid)
    res.status(200).json({
      success: true,
      productToAdd
    })
  } catch (error) {
    res.status(400).json({
      message: 'Cart or product id not found'
    })
  }
})
router.delete('/:cid', async (req, res) => {
  const { cid } = req.params
  try {
    await cartManager.deleteCart(cid)
    res.status(200).json({
      success: true,
      message: 'Cart deleted succesfully'
    })
  } catch (error) {
    res.status(400).json({
      error: 'An error ocurred'
    })
  }
})

export default router