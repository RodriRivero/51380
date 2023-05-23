import { Server } from 'socket.io'
import ProductManager from '../components/ProductManager.js'

export const initSockets = (server) => {
  const ioServer = new Server(server)
  ioServer.on('connection', (socket) => {
    console.log('New client connected id: ' + socket.id)

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
}
