import { PostModel } from '../models/post'
import { serviceCreatePost, serviceGetFeed } from '../services/post-service'
import { NextFunction, Request, Response } from 'express'
// const multer  = require('multer')
import multer from 'multer'




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
    return res.json(req.post)

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

export function addoneMedia(req: Request,res: Response,next: NextFunction) {
    const data = req.body
    
}
