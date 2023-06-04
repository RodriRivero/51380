import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import { Server } from "socket.io";

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
    socket.on("msg_front_to_back", (msg) =>{
      msgs.unshift(msg);
      socketServer.emit("msg_back_to_front", msgs);
    });
  });
}


import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      /* PONER TU STRING ENTERO ACA */
      "mongodb+srv://guido35723776:Pechoncha90@mongo-51380-rivero.aj8pasu.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
