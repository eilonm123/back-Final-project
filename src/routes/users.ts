import express from 'express'
import appRouter from '.'
import verifyUser from '../middlewares/verify-user'
import {getUserById,getUsers,updateUser,deleteUser, getMyFollowing, follow} from '../controllers/users-controller'


const router = express.Router()

// function sendResponse(req, res) {
// 	res.json({'avi': '1'})
// }

router.use(verifyUser)

router.get('/api/users/:username', getUserById)
router.get('/api/users', getUsers)
router.put('/api/users/:username', updateUser)
router.delete('/api/users/:username', deleteUser)
// router.get('/api/users/:username/followers', getFollowers)
router.get('/api/users/:username/following', getMyFollowing)
router.post('/api/users/follow', follow)




export default router