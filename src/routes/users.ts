import express from 'express'
import appRouter from '.'
import verifyUser from '../middlewares/verify-user'


const router = express.Router()

function sendResponse(req, res) {
	res.json({'avi': '1'})
}

router.use(verifyUser)

router.get('/api/users/:username', sendResponse)
router.get('/api/users/:username/followers', sendResponse)
router.get('/api/users/:username/following', sendResponse)




export default router