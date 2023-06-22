import { connect } from "mongoose";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import { Server } from "socket.io";
import { MsgModel } from "./dao/models/chats.model.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/thumbnails');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const uploader = multer({storage});
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);
  let msgs = [];

  socketServer.on("connection", (socket)=> {


    socket.on('addProduct', async (entries) => {
      const product = await ProductService.createOne(entries);
      socketServer.emit('addedProduct', product)
      })

      socket.on('deleteProduct', async id => {
      await ProductService.deleteOne(id);
      socketServer.emit('deletedProduct', id)
      })



    socket.on("msg_front_to_back", async (msg) =>{
      const msgCreated = await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      socketServer.emit("msg_back_to_front", msgs);
    });
  });
}


export async function connectMongo() {
  try {
    await connect(
      /* PONER TU STRING ENTERO ACA */
      "mongodb+srv://guido35723776:Pechoncha90@mongo-51380-rivero.aj8pasu.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
