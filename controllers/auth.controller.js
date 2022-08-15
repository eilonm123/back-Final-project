
const { createUser, getUserByUsernameAndPassword } = require('../services/auth-service');
// const { sign } = require('jsonwebtoken');
const secret = process.env.SECRET

async function register(req, res) {
	const user = await getUserByUsernameAndPassword(username, password);
	if (user) {
		throw new Error('user already exists')
	}
	else {
		try {
			const newUser = await createUser(req.body);
			res.send(newUser);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	}
}



