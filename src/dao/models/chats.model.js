import {Schema, model} from 'mongoose';

const schema = new Schema({
    user: { type: String, required: true,  max: 10 },
    message: { type: String, required: true,  max: 100}
});

export const MsgModel = model('messages', schema);
