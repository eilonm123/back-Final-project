import {PostModel} from '../models/post'

export async function getPostById(req, res, next) {
    const postId =  await PostModel.findOne({_id: req.params.postId})
    if (postId) {
        req.post = postId
        next()
    }

    else {
        res.send(404)
    }
}

export function getPost(req, res) {
    return res.json(req.post)

}

export function getFeed() {

}

export function getPostComments() {
    
}

export function getPostLikes() {
    
}

export function likes() {
    
}

export function unlike() {

}
