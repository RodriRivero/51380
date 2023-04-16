class ProductManager {
    constructor() {
        this.products = []; // Arreglo vacío para almacenar los productos
        this.productId = 1; // Id autoincrementable para los productos
    }

    // Método para agregar un producto al arreglo de productos
    addProduct(title, description, price, thumbnail, code, stock) {
        // Validación de campos obligatorios
        if(!title || !description || !price || !thumbnail || !code || !stock) {

            return console.log("Error: All fields are required.");
        }

        // Validación de código único
        const existingProduct = this.products.find(product => product.code === code);
        if(existingProduct) {

            return console.log("Error: The product code already exists.");
        }

        // Creación de nuevo producto con id autoincrementable
        const newProduct = {
            id: this.productId++, title, description, price, thumbnail, code, stock
        };

        // Agregar producto al arreglo de productos
        this.products.push(newProduct);
        console.log("Product added successfully:", newProduct);
    }

    // Método para obtener todos los productos
    getProducts() {   
        return console.log("All Products:",this.products);
    }

    // Método para buscar un producto por su id
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if(product) {
            return console.log("Searc by Id:",product) ;
        }
        else {
            console.log(" Error: Not Found.");//Cambiar
        }
    }
}



//*******************************/

// Ejemplo de uso de la clase ProductManager

// Crear una instancia de ProductManager
const productManager = new ProductManager ();

// Agregar productos

productManager.addProduct("remera", "Descripción del producto 1", 9.99, "imagen1.jpg", "000", 10);
productManager.addProduct("pantalon", "Descripción del producto 2", 19.99, "imagen2.jpg", "001", 5);
productManager.addProduct("pantalon", "Descripción del producto 2", 19.99, "imagen2.jpg", "001", 5);
productManager.addProduct("", "Descripción del producto 3", 14.99, "imagen3.jpg", "002", 3);

// Obtener todos los productos
const products = productManager.getProducts();
//console.log("All Products:", products);

// Buscar producto por id
const productById = productManager.getProductById(5);
//console.log("Searc by Id");
