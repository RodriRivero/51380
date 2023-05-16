import { Router } from "express";
import CartManager from "../components/CartManager.js";



const router = Router()
const carts = new CartManager

router.post("/", async (req, res) => {
    res.status(200).json( {
        status:"success",
        msg: await carts.addCarts()})})

router.get("/", async (req, res) => {
    res.status(201).json({status:"success", payloads: await carts.readCarts()})
})

router.get("/:id", async (req, res) => {
    res.send(await carts.getCartById(req.params.id))
})

router.post("/:cid/products/:pid", async (req, res ) => {
    let carId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProductInCart(carId, productId))
})

export default router