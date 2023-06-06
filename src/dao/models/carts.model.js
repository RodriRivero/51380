import { Schema, model } from "mongoose";

const productSchema = new Schema({
  idProduct: { type: Schema.Types.ObjectId, ref: "products" },
  quantity: { type: Number }
}, { _id: false });  // <-- No generar un _id adicional para el subdocumento

const cartSchema = new Schema({
  products: [productSchema]
}, { versionKey: false });

export const CartModel = model("carts", cartSchema);     