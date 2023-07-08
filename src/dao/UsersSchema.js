import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    firstName: { type: String,required: true,max: 100 },
    lastName: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100, unique: true },
    password: { type: String, required: true, max: 100 },
    age: { type: Number, required: false , max: 100 },
    isAdmin: { type: Boolean, required: true },
    cartID :{ type: String, required: false },
    role :{ type :String, required: true , default: "user" }
});



export { usersSchema };