import { PostModel } from '../models/post'


export async function serviceCreatePost(postData: any = {}, username: String) {
    const newPost = await PostModel.create(postData, username)
    console.log(newPost)
}

export async function serviceGetFeed() {
    const allPosts = await PostModel.find({})
    return allPosts
}

// const PostSchema = new mongoose.Schema({ // value's first letter must be a capital letter
//     author: {type: String, ref:"User", required: true, index: true},
//     body: { type: String, required: true, validate: (value) => { value.length > 0 } },
//     likes: { type: Number, default: 0},
//     caption: {type: String},
//     comments: {type: JSON},
// })