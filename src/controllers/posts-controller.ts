import { PostModel } from '../models/post'
import { serviceCreatePost, serviceGetFeed, serviceGetPost, serviceGetPostsByUsername } from '../services/post-service'
import { NextFunction, Request, Response } from 'express'
import { validatyeIdLength } from '../middlewares/validatyeIdLength'
import { notFound } from '../util/usersPosts';
import { idLengthError } from '../util/id'
import multer from 'multer'

const PAGE_LIMIT = 5


export async function getPostById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.postId
    const isValid = validatyeIdLength(id)
    if (isValid) {
        req.postId = id
        next()
    } else {
        res.send(idLengthError())
        // res.status(401).send()
    }
}

export async function getPostsByUsername(req: Request, res: Response) {
    console.log('get in here')
    const username = req.params.username
    console.log(username)
    const posts = await serviceGetPostsByUsername(username)
    if (posts) {
        res.send(posts)
    } else {
        res.send(`post ${notFound()}`)
    }


}

export async function getPostsOfUser(req: Request, res: Response) {
    const postId = req.postId
    const post = await serviceGetPost(postId)
    if (post) {
        res.send(post)
    } else {
        res.send(`post ${notFound()}`)
    }


}

export async function createProfilePicture(req: request, res: Response) {
    try {
        if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg') {
            res.send('please upload a file with extention of jpeg')
        } else {
            let { path: media } = req.file
            const updatedMedia = media.replace('\\', '/') // trying to save it not as : uploads\\1664182746286-DoReMi.jpg
            // const postData = { media, body, author }
            // const post = await serviceCreatePost(postData)
            // console.log(req.file.mimetype)
            // res.send(post)
        }
    } catch {
        res.send('image required')
    }
}

export async function createPost(req: Request, res: Response) {
    const { body } = req.body
    const author = req.username
    if (!author) {
        res.send('not authorized')
    }
    if (!body) {
        res.send('body required')
    } else {
        try {
            const files = req.files
            if (!files.length) {
                res.send('has to attached files')
            }
            const mediaList = files.map((file) => {
                if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
                    res.send('please upload a file with extention of jpeg or jpg')
                } else {
                    let { path: media } = file
                    return media
                }
            })
            const postData = { mediaList, body, author }
            const post = await serviceCreatePost(postData)
            res.send(post)



        } catch {
            res.send('image or video are required')
        }
    }
}

// export async function createPost(req: Request, res: Response) {
//     const { body } = req.body
//     const author = req.username
//     if (!author) {
//         res.send('not authorized')
//     }
//     if (body) {
//         try {
//             if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/jpg') { 
//                 res.send('please upload a file with extention of jpeg')
//             } else {
//                 let { path: media } = req.file
//                 const updatedMedia = media.replace('\\', '/') // trying to save it not as : uploads\\1664182746286-DoReMi.jpg
//                 const postData = { media, body, author }
//                 const post = await serviceCreatePost(postData)
//                 console.log(req.file.mimetype)
//                 res.send(post)
//             }
//         } catch {
//             res.send('image or video are required')
//         }
//     } else {
//         res.send('body required')
//     }
// }

export async function getFeed(req, res) {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 5
    const offset = page * PAGE_LIMIT

    const posts = await serviceGetFeed(offset, limit)
    const listOfModifiedMediaList = posts.map((post) => {
          return post.mediaList.map((url) => {
             return url.replaceAll('\\', '/')
        })
    })
    // const updatedPosts = posts.map((post, index)=>{
    //     post.mediaList = listOfModifiedMediaList[index]
    //     return post
    // })

    // if (listOfModifiedMediaList) {
        
    //     return res.send(listOfModifiedMediaList)
    // } else {
    //     return res.send('no posts yet')
    // }
    res.json(posts)
}


export function getPostComments() {

}

export function getPostLikes() {

}

export function likes() {

}

export function unlike() {

}


