import { verify } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// import { trusted } from 'mongoose'
import { UserModel } from '../models/user'
import { updateTokenTimeOfUserDB, getTokenAndOptions, getUserById } from '../services/auth-service'

const VALIDATION_30MINUTES = 1000 * 60 * 30
const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 90
const EXPIRATION_THRESHOLD = EXPIRATION_TIME * 0.75

async function verifyUser(req, res, next) {
	const token = req.cookies['cookieInsta']  /* token return "createdAt" (date) and "signAt" (id) */
	if (!token) {
		res.sendStatus(401)
	} else {
		try {
			const tokenValue = await verify(token, process.env.SECRET) /* token return "createdAt" (date) and "signAt" (id) */
			console.log(tokenValue)
			const tokenDate = tokenValue.createdAt
			const tokenId = tokenValue.signAt.id
			if (Date.now() - tokenDate > EXPIRATION_TIME) {
				res.sendError(403)
			} else if (Date.now() - tokenDate < VALIDATION_30MINUTES) { /* above 30 mintues, create new token */
				console.log('passed before 30 minutes')
				const user = await getUserById(tokenId)
				req.username = user?.username
				console.log('ok')
				next()
			} else {
				const time = Date.now()
				const tokenOptions = await getTokenAndOptions(tokenId, time)
				updateTokenTimeOfUserDB(tokenId, time)
				console.log('above 30 minutes succeded')
				res.cookie('cookieInsta', tokenOptions.token, tokenOptions.options)
				const user = await getUserById(tokenId)
				req.username = user?.username
				console.log('ok')
				next()
			}
		}
		catch {
			res.status(401).send({ message: 'you are not authorized' })
		}
	}
}


 export default verifyUser