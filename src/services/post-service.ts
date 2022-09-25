import { PostModel } from '../models/post'


export async function serviceCreatePost(postData: any = {}, username: String) {
    const newPost = await PostModel.create(postData, username)
    console.log(newPost)
}

export async function serviceGetFeed() {
    const allPosts = await PostModel.find({})
    return allPosts
}

