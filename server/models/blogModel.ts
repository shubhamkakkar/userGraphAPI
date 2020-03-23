import {Schema, model} from "mongoose";
const blogModel = new Schema({
    blogHeader: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: false,
        default: []
    },
    userId:{
        type: String,
        required: true
    }
}, {collection: "blogs"});

export default model('blogModel', blogModel)
