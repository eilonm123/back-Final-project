import bcrypt from 'bcrypt'
import { UserModel } from '../models/user'
import { verify, sign } from 'jsonwebtoken'


export async function createUser(user: any = {}) {
	if (!user.username) {
		throw new Error('username is required');
	}
	try {
		// console.log(user)
		const newUser = new UserModel({
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			password: user.password,
			email: user.email
		});
		await newUser.save() // למה לא מצליח לשמור וקודם כן
		return newUser;
	}
	catch(err) {
		console.log(err)
		throw new Error(err)
	}
}

// async function hash(password: string) {
// 	try{
// 		const salt = bcrypt.genSalt(10)
// 		const hashedPassword = await bcrypt.hash(password, salt)
// 		return hashedPassword
// 	}
// 	catch(e){
// 		console.log(e)
// 	}

// }

export async function getUserByUsername(username) {
	const user = await UserModel.findOne({ username: username })
	return user

}

export async function getUserByUsernameAndPassword(username, password) {
	const user = await UserModel.findOne({ username: username, password: password })
	return user

}

export async function updateTokenTimeOfUserDB(id, date) {
	const user = await UserModel.findOneAndUpdate({_id: id}, {tokenCreatedAt: date}, {new: true} )
	console.log(user)
	return user
}

export async function createNewToken(id, tokenDate) { // token return "createdAt" (date) and "signAt" (id)
	const signUser = { id: id }
	const token = sign({ createdAt: tokenDate, signAt: signUser  }, process.env.SECRET)
	const options = {
		httpOnly: true
	}
	console.log(tokenDate)
	return {token, options}
}


export async function getUserById(userId) {
	const user = await UserModel.findById(userId)
	return user
}


// async function hashPassword(password) {
//     const hash = await bcrypt.hash(password, 10)
//     return hash
// }