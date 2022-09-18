import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import appRouter from './routes'
import { connectTodb } from './services/db';
import bcrypt from 'bcrypt'
import cookieParser  from 'cookie-parser'
const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(appRouter)

// async function fetchSalt() {
// 	const salt = await bcrypt.genSalt(10)
// 	console.log(salt)
// }
// fetchSalt()

connectTodb() 

dotenv.config()

app.listen(process.env.PORT, () => {
	console.log('listening on port 3000');
})


// function sum(a: number,b: number): number { // the type after the brackets deescribe what the function
// 	if (a > 5) {
// 		return a;
// 	}
// 	return b;

// }

// async function isUserLoggedIn(): Promise<boolean> {
// 	return true
// }

// function getNames(): Array<string> {
// 	return ['avi', 'moshe']
// }

// function getNames2(): string[] {
// 	return ['avi', 'moshe']
// }

// enum Action {
// 	REMOVE = 0,
// 	UPDATE = 1,
// 	CREATE = 2,
// }

// function operate(user: any, opration: Action){
// 	if (opration === Action.CREATE) {
// 		//
// 	}
// }

// interface Ipost {
// 	content: string,
// 	created?: Date, // the question mark make it not required
// 	picture: string,
// 	tags: Array<string>
// }

// type Ipost2 = {
// 	_id: string,
// 	content?: Date, // the question mark make it not required
// 	picture: string,
// 	created: Array<string>
// }

// function createPost(post: Ipost) {

// }

// function updatePost(postId: string, changes: Partial<Ipost>) { // you can add some of the properties of the object
// 	if (changes.tags) {
// 		changes.tags.push('234')
// 	}
// }

// function updatePost2(postId: string, changes: Omit<Ipost, '_id' | 'tags'>) {  // the names of the properties you want to ignore.
// 	if (changes.tags) {
// 		changes.tags.push('234')
// 	}
// }

// function updatePost3(postId: string, changes: Pick<Ipost, '_id' | 'tags'>) { // can add only one of them
// }

// createPost({
// 	content: 'moshe',
// 	picture: 'avi',
// 	created: new Date,
// 	tags: []
// })

// operate({}, Action.UPDATE);

// console.log(sum(3, 1))