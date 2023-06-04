import fs from 'fs'
import productManager from './ProductManager.js'
import { nanoid } from 'nanoid'

class CartManager {
  constructor (path) {
    this.path = path
  }

  async getCarts () {
    try {
      return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    } catch (error) {
      return []
    }
  }
  

  async createCart () {
    const carts = await this.getCarts()
    const newCart = {
      id: nanoid(),
      products: []
    }
    carts.push(newCart)
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
    return newCart.id
  }

  async getCartById (cid) {
    const carts = await this.getCarts()
    const cart = carts.find(cart => cart.id === cid)
    if (!cart) throw new Error(`Cart not found by id: ${cid}`)
    return cart
  }

  async addProductsToCart (cid, pid) {
    const carts = await this.getCarts()
    try {
      await productManager.getProductsById(parseInt(pid))
    } catch (error) {
      throw new Error('Product id not found')
    }
    const cartIndex = carts.findIndex(cart => cart.id === cid)
    if (cartIndex === -1) throw new Error(`Cart not found by id: ${cid}`)

    const productIndex = carts[cartIndex].products.findIndex(product => product.id === pid)
    if (productIndex === -1) {
      carts[cartIndex].products.push({ id: pid, quantity: 1 })
    } else {
      carts[cartIndex].products[productIndex].quantity += 1
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
    return carts[cartIndex]
  }

  async deleteCart (cid) {
    const carts = await this.getCarts()
    const cartToDelete = carts.findIndex(cart => cart.id === cid)
    if (cartToDelete === -1) {
      throw new Error(`Cart not found by id: ${cid}`)
    }
    carts.splice(cartToDelete, 1)
    fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
  }
}

export default new CartManager('./src/dao/models/carts.json')