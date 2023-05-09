import { Router } from "express";
import CartManager from "../components/CartManager.js";



const CartRouter = Router()
const carts = new CartManager

CartRouter.post("/", async (req, res) => {
    res.status(200).json( {
        status:"success",
        msg: await carts.addCarts()})})

CartRouter.get("/", async (req, res) => {
    res.status(201).json({status:"success", data: await carts.readCarts()})
})

CartRouter.get("/:id", async (req, res) => {
    res.send(await carts.getCartById(req.params.id))
})

CartRouter.post("/:cid/products/:pid", async (req, res ) => {
    let carId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProductInCart(carId, productId))
})

export default CartRouter