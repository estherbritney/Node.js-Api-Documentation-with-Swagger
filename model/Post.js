const mongoose = require('mongoose')

const Schema = mongoose.Schema;

 const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "Please provide a title"],
        unique: false,
    },
    description: {
        type: String,
        required: [ true, "Please provide a description for the post"],
        unique: false,
    },
    content: {
        type: String,
        required: [true, "Please provide content for the post"],
        unique: false,
    },
    author: { type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "post should have an author"],
    }
});

module.exports =   mongoose.model('Post', PostSchema);