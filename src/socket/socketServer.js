import { Server } from 'socket.io'
import ProductManager from '../components/ProductManager.js'

export const initSockets = (server) => {
  const ioServer = new Server(server)
  ioServer.on('connection', (socket) => {
    console.log('New client connected id: ' + socket.id)

    socket.on('createProduct', async (data) => {
      try {
        const newProduct = await productManager.addProduct(data)
        ioServer.emit('newProduct', newProduct)
        socket.emit('messageSuccess', 'Producto creado con éxito')
      } catch (err) {
        socket.emit('messageError', err.message)
      }
    })

    socket.on('deleteProduct', async (idProduct) => {
      try {
        console.log(idProduct)
        await productManager.deleteProduct(idProduct)
        const productsRefresh = await productManager.getProducts()
        ioServer.emit('refreshPage', productsRefresh)
      } catch (err) {
        socket.emit('errorMessage', err.message)
      }
    })
  })
}
