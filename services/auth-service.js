const users = [];

const { UserModel } = require('../models/user');

function createUser(user = {}) {
	if (!user.userName) {
		throw new Error('username is required');
	}

	try{
		const newUser = new UserModel({
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.userName,
			password: hashPassword(user.password)
		});
		newUser.save()
		return newUser;

	}


	catch {
		throw Error(error)
	}
}

async function getUserByUsernameAndPassword(username, password) {
	const user = await UserModel.findOne({ userName: username, password: password })
	return user

}

async function getUserById(userId) {
	const user = await UserModel.findById(userId)
	return user
}

module.exports = {
	createUser,
	getUserByUsernameAndPassword,
	getUserById
}
