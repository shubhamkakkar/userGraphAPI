import {Schema, model} from "mongoose";
const createdDate = new Date();
const [createdDateFormatYYYYMMDD] = createdDate.toISOString().split("T");

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
        type: [String],
        required: false,
        default: []
    },
    userId:{
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: createdDateFormatYYYYMMDD
    }
}, {collection: "blogs"});

export default model('blogModel', blogModel)
