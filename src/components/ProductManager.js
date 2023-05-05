import fs from 'fs';
import { nanoid } from 'nanoid';

export default class ProductManager {
    constructor(path) {
        this.productId = nanoid(7); // Id autoincrementable para los productos
        this.path = "./src/models/products.json";
    }

    

    // Método para agregar un producto al arreglo de productos
    async addProduct(path) {
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = path;
        // Validación de campos obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {

            return `Error: All fields are required.`;
        }


        // Validación de código único
        const products = await this.getProducts();
        const existingProduct = products.find(product => product.code === code);
        if (existingProduct) {

            return `Error: The product whith code ${code} already exists.`;
        }

        // Creación de nuevo producto con id autoincrementable
        const newProduct = {
            id: this.productId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        // Agregar producto al arreglo de productos
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
        return "Product added !!"
    }


    // Método para obtener todos los productos
    async getProducts() {
        if (!fs.existsSync(this.path)) {
            return []
        } else {
            const data = await fs.promises.readFile(this.path, "utf-8");
            if (data.trim().length === 0) {
                return [];
            }
            const products = JSON.parse(data);
            return products
        }

    }

    // Método para buscar un producto por su id
    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (product) {
            return product
        } else {
            return `Error: Product with id ${id} not found .`
        }
    }



    // Método para eliminar un producto por su id
    async deleteProduct(id) {
        let products = await this.getProducts();
        let existingProducts = products.some(product => product.id === id);
        if (existingProducts) {
            let filterProducts = products.filter(product => product.id != id)
            await this.addProduct(filterProducts)
        return ` removed product with id : ${id} `
        }    
        return "the product to delete does not exist"
    }

}


