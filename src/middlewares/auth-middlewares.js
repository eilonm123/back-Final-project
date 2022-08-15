const { getUserById } = require('../services/auth-service'); // גט יוזרס ביי איי די קורא לפונקציה שבשורה מתחת
const {verify} = require('jsonwebtoken')
const secret = process.env.SECRET

async function verifyUser(req, res, next) {
	const token = req.headers['token']; // במקום זה להכניס WEB TOKEN
	try {
		const tokenRes = verify(JSON.parse(token), secret)
		console.log(tokenRes)
		const user = await getUserById(tokenRes.id);
		req.user = user; 
		next();
	}
	catch {
		console.log('no user!') // if promise never fails, how user can be false? (!user)
		return res.status(401).send({ message: 'you are not authorized' })
	}
}

module.exports = { verifyUser }


