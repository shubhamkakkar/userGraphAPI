import {Schema, model} from "mongoose";

const userModel = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {collection: "users"});

export default model('userModel', userModel)
