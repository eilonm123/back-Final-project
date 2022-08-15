
const { createUser, getUserByUsernameAndPassword } = require('../services/auth-service');
const { sign } = require('jsonwebtoken');
const secret = process.env.SECRET

async function login(req, res) {
	const { username, password } = req.body;
	const user = await getUserByUsernameAndPassword(username, password);
	if (user) {
		const token = sign({id: user._id}, secret)
		res.send({ username: user.userName, id: user.id, token });
	} else {
		res.status(401).send({ message: 'invalid username or password' });
	}
}

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

module.exports = {register, login}


