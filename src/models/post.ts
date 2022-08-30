import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({ // value's first letter must be a capital letter
    numberOfTodos: Number,
    body: { type: String, required: true, validate: (value) => { value.length > 0 } },
    likes: { type: Number, required: true }
    // comments: { type:}
})

export const PostModel = mongoose.model('Post', PostSchema) // you have to put a capital letter in the first parameter



