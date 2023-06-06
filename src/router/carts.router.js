import express from 'express';
import CartService from '../services/carts.service.js';

export const cartsRouter = express.Router();

const cartService = new CartService();

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = await cartService.createCart();
    return res.status(201).json({
      status: 'success',
      msg: 'Cart created',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const cart = await cartService.getCartById(idCart);
    return res.status(200).json({
      status: 'success',
      msg: 'Cart found',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const cart = await cartService.deleteCartById(idCart);
    return res.status(200).json({
      status: 'success',
      msg: 'Cart deleted',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProd = req.params.pid;
    const cart = await cartService.addProductToCart(idCart, idProd);
    return res.status(200).json({
      status: 'success',
      msg: 'Product added to cart',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProd = req.params.pid;
    const cart = await cartService.removeProductFromCart(idCart, idProd);
    return res.status(200).json({
      status: 'success',
      msg: 'Product removed from cart',
      payload: cart
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});