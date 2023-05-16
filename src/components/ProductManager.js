import  fs from 'fs';
import { nanoid } from 'nanoid';



class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }


    
    async  readProducts ()  {
    let products = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(products);

    };
    

    async writeProducts(product) {
    await fs.promises.writeFile(this.path, JSON.stringify(product, null, 2));
    };

    async existProduct(id) {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id)
    } 


   /* async addProducts (product) {
    let oldProducts = await this.readProducts();//loaddata
    product.id = nanoid(8)
    let allProducts = [...oldProducts, product];
    await this.writeProducts(allProducts)
    return "Product added successfully!!"
    };*/

    async addProduct (product) {
        await this.readProducts()
        const verify = this.products.find((cod) => cod.code === product.code)
        if (verify !== undefined) {
          return ('Product code already exists. Try with another code')
        }
        if (!product.title ||
                !product.desc ||
                !product.price ||
                !product.code ||
                !product.stock) {
          return ('You must to complete all the fields')
        }
        product.price = parseFloat(product.price)
        product.stock = parseInt(product.stock)
        product.code = parseInt(product.code)
        this.products.push({ id: nanoid(8), ...product, status: product.status ?? true })
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      }







    async getProducts() {
    return await this.readProducts();
    };

    
    // Método para buscar un producto por su id
    async getProductById(id) {
        let productById = await this.existProduct(id);
        if (!productById) return `product with id:${id} not exist`
            return productById
    };

    async updateProducts (id, product){
        let productById = await this.existProduct(id)
        await this.deleteProduct(id)
        let oldProducts = await this.readProducts()
        let products = [{...product, id :id }, ...oldProducts]
        await this.writeProducts(products)
        return `Product with id:${id} updated successfully !`

    }


    // Método para eliminar un producto por su id y devuelve la lista sin el producto
    async deleteProduct(id) {
        let products = await this.readProducts();
        let existingProducts = products.some(prod => prod.id === id);
        if (existingProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
        return ` removed product with id : ${id} `
        }    
        return "the product to delete does not exist"
    };



    }


export default ProductManager