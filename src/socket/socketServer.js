import { Server } from 'socket.io'
import ProductManager from '../components/ProductManager.js'

export const initSockets = (server) => {
  const ioServer = new Server(server)
  ioServer.on('connection', (socket) => {
    console.log('New client connected id: ' + socket.id)

    socket.on('createProduct', data => {
      console.log(data)
      const newProduct = ProductManager.addProducts(data)
      ioServer.emit('newProduct', newProduct)
    })
  })
}
