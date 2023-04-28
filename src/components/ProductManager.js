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


// **********************TESTING******************************** */

/*const test = async () => {
//Se creará una instancia de la clase “ProductManager”
    const productManager = new ProductManager('data.json'); 
//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    //console.log(await productManager.getProducts()) 
//Se llamará al método “addProduct” con los campos:etc.//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
    const testProduct = {                         //Se llamará al método “addProduct” con los campos:etc.//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
        title: "remera rosa oscura 1",
        description: "remera 100% de algodon",
        price: 2000,
        thumbnail: "Sin imagen",
        code: "0001",
        stock: 10
    };
    console.log(await productManager.addProduct(testProduct))


//Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
    const productOneUpdates = {
        title: "remera rosa claro ",
        description: "remera 50% de algodon"
        };
        // Actualiza el producto1
    //console.log('product update with changes :' , await productManager.updateProduct(1, productOneUpdates));
 //genera el nuevo producto con id 
        const product2 = {
            title: "remera rosa modelo 2",
            description: "remera con nuevo modelo id",
            price: 3000,
            thumbnail: "Sin imagen",
            code: "0002",
            stock: 20
            };

        const product3 = {
            title: "remera rosa modelo 3",
            description: "remera con nuevo modelo id",
            price: 3000,
            thumbnail: "Sin imagen",
            code: "0003",
            stock: 20
            };

        const product4 = {
            title: "remera rosa modelo 4",
            description: "remera con nuevo modelo id",
            price: 3000,
            thumbnail: "Sin imagen",
            code: "0004",
            stock: 25
            };    

            const product5 = {
                title: "remera roja modelo 5",
                description: "remera con nuevo modelo id",
                price: 3000,
                thumbnail: "Sin imagen",
                code: "0005",
                stock: 25
                }; 


    // Agrega el producto2 y espera para guardar los cambios en el archivo de datos..
    console.log( await productManager.addProduct(product2));
    console.log( await productManager.addProduct(product3));
    console.log( await productManager.addProduct(product4));
    console.log( await productManager.addProduct(product5));
    //console.log('Searc by Id:', await productManager.getProductById(1))
    //console.log('Searc by Id:', await productManager.getProductById(19))

//Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.v
    //console.log(await productManager.deleteProduct(33))
}

test();*/
