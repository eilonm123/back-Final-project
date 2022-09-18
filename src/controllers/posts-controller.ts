import { PostModel } from '../models/post'
import { serviceCreatePost, serviceGetFeed } from '../services/post-service'

export async function getPostById(req, res, next) {
    const postId = await PostModel.findOne({ _id: req.params.postId })
    if (postId) {
        req.post = postId
        next()
    }

    else {
        res.send(404)
    }
}

export function getPost(req: Express.Request, res: Express.Response) {
    return res['json'](req['post'])

}

export async function createPost(req: Express.Request, res: Express.Response) {
    const username = req['username']
    const postData = req['body']
    console.log(`post is ${postData}`)        

}

export async function getFeed(req, res) {
    const allPosts = await serviceGetFeed()
    return res.json(allPosts)
}

export function getPostComments(req, res) {

}

export function getPostLikes(req, res) {

}

export function likes(req, res) {

}

export function unlike(req, res) {

}
