import verifyUser from '../middlewares/verify-user';
import {verify, sign} from 'jsonwebtoken'
import { getUserByUsername, getUserByUsernameAndPassword, createUser, updateTokenTimeOfUserDB, createNewToken } from '../services/auth-service';
import bcrypt from 'bcrypt'
import {cookieParser, cookie} from 'cookie-parser'


export async function controllerLogin(req, res) {
    const { username, password } = req.body;
    const salt = process.env.MY_SALT
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await getUserByUsernameAndPassword(username, hashedPassword);
    if (user) {
        // const signUser = { id: user._id }
        // console.log(user._id)
        const tokenDate = new Date().getTime()
        // console.log(tokenDate)
        await updateTokenTimeOfUserDB(user._id,tokenDate )
        const tokenOptions =  await createNewToken(user._id, tokenDate)
        res.cookie('cookieInsta', tokenOptions.token, tokenOptions.options )
        res.send('yes')
    }
    else {
        res.sendStatus(401)
    }
    }

    export async function controllerRegister(req, res) {
        const { username } = req.body
        const user = await getUserByUsername(username);
        if (user) {
            res.send('user already exists')
        } else {
            try {
                const newUser = await createUser(req.body);
                res.send('welcome '+ username)
            }
            catch {
                res.status(400).send({ message: 'oy' });
            }
        }

    }




    export function userInfo() {

    }

