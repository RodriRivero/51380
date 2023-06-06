import { CartModel } from '../dao/models/carts.model.js';
import { ProductModel } from '../dao/models/products.model.js';


export default class CartService {

    async createCart() {
        try {
            const cart = await CartModel.create({});
            return cart;
        } catch (err) {
            throw err;
        }
        }

        async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
            throw new Error('Cart not found');
            }
        
            const product = await ProductModel.findById(productId);
            if (!product) {
            throw new Error('Product not found');
            }
        
            const existingProduct = cart.products.find(product => product.idProduct.toString() === productId);
            if (existingProduct) {
            existingProduct.quantity += 1;
            } else {
            cart.products.push({ idProduct: productId, quantity: 1 });
            }
        
            const savedCart = await cart.save();
            return savedCart;
        } catch (error) {
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
            throw new Error('Cart not found');
            }
        
            const productIndex = cart.products.findIndex(product => product.idProduct.toString() === productId);
            if (productIndex === -1) {
            throw new Error('Product not found in the cart');
            }
        
            if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
            } else {
            cart.products.splice(productIndex, 1);
            }
        
            const savedCart = await cart.save();
            return savedCart;
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(cartId) {
        try {
            const cart = await CartModel.findByIdAndDelete(cartId);
            if (!cart) {
            throw new Error('Cart not found');
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }
}