import {Schema, model} from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        max: 100
    },
    lastName: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 100
    },
    age: {
        type: Number,
        required: true,
        max: 100
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

usersSchema.plugin(mongoosePaginate);
export const UserModel = model('user', usersSchema);



