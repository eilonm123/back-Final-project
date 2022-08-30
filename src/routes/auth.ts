import express from 'express'
// import {login, register, userInfo} from '../controllers/auth-controller'
import verifyUser from '../middlewares/verify-user'
import {controllerRegister, controllerLogin} from '../controllers/auth-controller'
import bcrypt from 'bcrypt'

const router = express.Router()

// async function isValidProps(username, password) {
// 	const promise = new Promise((resolve, reject) => {
// 		if (username === 'username' && password === 'password') {
// 			resolve([username, password] )
// 		} else {
// 			reject('the props are not correct')
// 		}
// 	})
// 	return promise
// }





router.post('/api/login', controllerLogin)
router.post('/api/register', controllerRegister)
router.get('/api/user-info',verifyUser, (req, res) => {
    // console.log(req.user)
    // res.json(req.user)
} )

export default router