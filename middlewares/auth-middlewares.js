const { getUserById } = require('../services/auth-service'); 

function verifyUser(req, res, next) {
	const userId = req.headers['userid'];

	const user = getUserById(userId);
	if (!user) {
		return res.status(401).send({ message: 'you are not authorized' })
	}

	req.user = user;
	next();

}

module.exports = { verifyUser }


