import { verify } from 'jsonwebtoken'
// import { trusted } from 'mongoose'
const secret = process.env.SECRET
import { UserModel } from '../models/user'
import { updateTokenTimeOfUserDB, createNewToken } from '../services/auth-service'

const VALIDATION_30MINUTES = 1000 * 60 * 30
const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 90
const EXPIRATION_THRESHOLD = EXPIRATION_TIME * 0.75

async function verifyUser(req, res, next) {
	const token = req.cookies['cookieInsta']  /* token return "createdAt" (date) and "signAt" (id) */
	if (!token) {
		res.sendStatus(403)
	} else {
		try {
			const tokenValue = verify(token, process.env.SECRET) /* token return "createdAt" (date) and "signAt" (id) */
			const user = await UserModel.findById({ _id: tokenValue.signAt.id })
			if (user.tokenCreatedAt) {
				if (Date.now() - user.tokenCreatedAt < EXPIRATION_TIME) {
					// const user = await UserModel.findById({ _id: tokenValue.signAt.id })
					if (Date.now() - user.tokenCreatedAt > VALIDATION_30MINUTES) {
						if (user !== undefined) {
							const time = Date.now()
							const tokenOptions = await createNewToken(user._id, time)
							updateTokenTimeOfUserDB(user._id, time)
							console.log('above 30 minutes succeded')
							res.cookie('cookieInsta', tokenOptions.token, tokenOptions.options)
							req.user = user
							next()
						} else {
							res.send(401)
						}
					} else {
						console.log('passed before 30 minutes')
						req.user = user
						next()
					}
				}
			}
		}
		catch {
			return res.status(401).send({ message: 'you are not authorized' })
		}
	}
}

export default verifyUser


// const {verify} = require('jsonwebtoken')
// const secret = process.env.SECRET

// async function verifyUser(req, res, next) {
// 	const token = req.headers['token']; // במקום זה להכניס WEB TOKEN
// 	try {
// 		const tokenRes = verify(JSON.parse(token), secret)
// 		console.log(tokenRes)
// 		const user = await getUserById(tokenRes.id);
// 		req.user = user;
// 		next();
// 	}
// 	catch {
// 		console.log('no user!') // if promise never fails, how user can be false? (!user)
// 		return res.status(401).send({ message: 'you are not authorized' })
// 	}



// }
