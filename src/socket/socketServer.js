import {Server} from 'socket.io'
import ProductManager from '../dao/filesystem/ProductManager.js'
/***falta el productservices como const= .. */

export const initSockets = (server) => {

    const ioServer = new Server(server)
    ioServer.on('connection', (socket) => {
        console.log('New client connected id: ' + socket.id);


        socket.on('msg_from_client_to_server', async (newProduct) => {
            try {
                await productService.createProduct(newProduct);
                const productList = await productService.getAllProducts();
                // BACK EMITE
                io.emit("updatedProducts", {productList})
            } catch (error) {
                console.log(error);
            }
        })
        socket.on('deleteProduct', async (id) => {
            try {
                await productService.deleteProduct(id);
                socket.emit('productDeleted', {message: 'Producto eliminado exitosamente'});
                const productList = await productService.getAllProducts();
                io.emit('updatedProducts', {productList});
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                socket.emit('productDeleteError', {error: 'Ocurrió un error al eliminar el producto'});
            }


            socket.on('createProduct', async (data) => {
                try {
                    const newProduct = await ProductManager.addProduct(data)
                    ioServer.emit('newProduct', newProduct)

                    socket.emit('messageSuccess', 'Product create with éxito')
                } catch (err) {
                    socket.emit('messageError', err.message)
                }
            })

            socket.on('deleteProduct', async (idProduct) => {
                try {
                    console.log(idProduct)
                    await ProductManager.deleteProduct(idProduct)
                    const productsRefresh = await ProductManager.getProducts()
                    ioServer.emit('refreshPage', productsRefresh)
                } catch (err) {
                    socket.emit('errorMessage', err.message)
                }
            })
        })
    })
}
