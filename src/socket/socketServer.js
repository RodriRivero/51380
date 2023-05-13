import { Server } from "socket.io";
import ProductManager from "../components/ProductManager.js";


export const initSockets = (server) => {
    const ioServer = new Server(server)
    ioServer.on ('connection', (Socket) => {
        console.log(`new client connected with id: ${Socket.id}`)

        Socket.on('createProduct', data => {
            console.log(data)
            const newProduct = ProductManager.Addproducts(data)
            ioServer.emit('newProduct', newProduct)
        })
    })
}