import verifyUser from '../middlewares/verify-user';
import {verify, sign} from 'jsonwebtoken'
import { getUserByUsername, getUserByUsernameAndPassword, createUser, updateTokenTimeOfUserDB, getTokenAndOptions } from '../services/auth-service';
import bcrypt from 'bcrypt'
import {cookieParser, cookie} from 'cookie-parser'


export async function login(req, res) {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) {
        res.sendStatus(401)
    }
    else if(await bcrypt.compare(password, user.password)) {
        const tokenDate = new Date().getTime()
        await updateTokenTimeOfUserDB(user._id,tokenDate )
        const tokenAndOptions =  await getTokenAndOptions(user._id, tokenDate)
        res.cookie('cookieInsta', tokenAndOptions.token, tokenAndOptions.options )
        res.send('hello ' + user.username)
    } else {
        res.sendStatus(403)
    }}

    export async function register(req, res) {
        const { username } = req.body
        console.log(req.body)
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

