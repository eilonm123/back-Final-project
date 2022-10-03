import { PostModel } from '../models/post'
import { Types } from 'mongoose'


interface IPost {
    author: Types.ObjectId;
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

export async function serviceGetPostsByUsername(username: string){
    const allPosts = await PostModel.find({}).populate("author")
    return allPosts
}

