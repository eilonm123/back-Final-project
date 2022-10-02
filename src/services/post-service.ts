import { PostModel } from '../models/post'


interface IPost {
    author: String;
    mediaList: String[];
    body: String;
    caption?: String;
}


export async function serviceCreatePost(postData: IPost) {
    const newPost = await PostModel.create(postData)
    return newPost
}

export async function serviceGetFeed(offset = 0, limit = 5) {
    const allPosts = await PostModel.find({}).sort({created: -1}).skip(offset).limit(limit)
    return allPosts
}

export async function serviceGetPost(id) {
    const post = await PostModel.findOne({_id: id})
    return post
}

export async function serviceGetPostsByUsername(username){
    const allPosts = await PostModel.find({author: username})
    return allPosts
}

