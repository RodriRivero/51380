import { Server } from "socket.io";
import ProductManager from "../components/ProductManager.js";


export const initSockets = (server) => {
    const ioServer = new Server(server)
    ioServer.on('connection', (socket) => {
        console.log('Nuevo cliente conectado con id: ' + socket.id)

        Socket.on('createProduct', data => {
            console.log(data)
            const newProduct = ProductManager.Addproducts(data)
            ioServer.emit('newProduct', newProduct)
        })
    })
} 