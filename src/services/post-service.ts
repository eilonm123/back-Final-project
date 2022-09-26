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

export async function serviceGetFeed() {
    const allPosts = await PostModel.find({})
    return allPosts
}

export async function serviceGetPost(id) {
    const post = await PostModel.findOne({_id: id})
    return post
}

