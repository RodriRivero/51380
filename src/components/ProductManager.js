import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.productId = 1; // Id autoincrementable para los productos
        this.path = "data.json";
    }

    

    // Método para agregar un producto al arreglo de productos
    async addProduct(data) {
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = data;
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
            id: this.productId ++,
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
        return newProduct
    }


    // Método para obtener todos los productos
    async getProducts() {
        if (!fs.existsSync(this.path)) {
            return []
        } else {
            const fileData = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(fileData);
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


    // Método para actualizar un producto por su id
    async updateProduct(id, updates) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            const updatedProduct = {
                ... products[index],
                ...updates
            };
            products[index] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return `This product updated successfully:`,
            updatedProduct;
        } else {
            return `Error: Product with id ${id} not found.`;
        }
    }

    // Método para eliminar un producto por su id
    async deleteProduct(id) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = products.splice(index, 1)[0];
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return ' This Product deleted successfully:',
            deletedProduct;
        } else {
            return `Error: Can't delete id ${id}  doesn't exist`;
        }
    }

}


