import express from 'express'
import verifyUser from '../middlewares/verify-user'
import upload from '../middlewares/upload'
import {getPostById, getPosts, getFeed, getPostComments, getPostLikes, likes, unlike, createPost } from '../controllers/posts-controller'
const router = express.Router()


function sendResponse(req, res) {
	return res.json({'avi': '1'})
}

router.use(verifyUser)

router.get('/api/feed', getFeed)
router.get('/api/posts/:postId',getPostById)
router.get('/api/posts/:postId/comments',getPostById, getPostComments) // if postId dont shown as query how to pass the middleware an id?
router.get('/api/posts/:postId/likes',getPostById, getPostLikes)
router.post('/api/posts', upload.single('singleMedia'), createPost)
router.post('/api/posts/:postId/like',getPostById, likes)
router.post('/api/posts/:postId/unlike',getPostById, unlike)


export default router