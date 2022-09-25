import { PostModel } from '../models/post'
import { serviceCreatePost, serviceGetFeed } from '../services/post-service'
import { NextFunction, Request, Response } from 'express'
import { validatyeIdLength } from '../middlewares/validatyeIdLength'
import { notFound } from '../util/users';
import multer from 'multer'




export async function getPostById(req: Request, res: Response) {
    const id = req.params.postId
    const isValid = validatyeIdLength(id)
    if (isValid) {
        const postId = await PostModel.findOne({ _id: id })
        if (postId) {
            res.send(postId)
        } else {
            return res['send'](`post ${notFound()}`)
        }
    } else {
        res.status(401).send()
    }
}

export async function getPosts(req: Request, res: Response) {
    const id = req.params.postId
    const posts = await serviceGetFeed()
    if (posts) {
        return res.send(posts)
    } else {
        return res.send('no posts yet')
    }

}

export async function createPost(req: Express.Request, res: Express.Response) {
    console.log(req.file)
    // const username = req.username
    // const postData = req['body']
    // console.log(`post is ${postData}`)
    // if (postData.body.length) {
    //     const post = await serviceCreatePost(postData, username)
    //     return res['json'](post)
    // }



    // author: {type: String, ref:"User", required: true, index: true},
    // body: { type: String, required: true, validate: (value) => { value.length > 0 } },
    // likes: { type: Number, default: 0},
    // caption: {type: String},
    // comments: {type: JSON},

}

export async function getFeed(req, res) {
    const allPosts = await serviceGetFeed()
    return res.json(allPosts)
}

export function getPostComments() {

}

export function getPostLikes() {

}

export function likes() {

}

export function unlike() {

}

export function addoneMedia(req: Request, res: Response, next: NextFunction) {
    const data = req.body

}
