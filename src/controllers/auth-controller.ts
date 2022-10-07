import verifyUser from '../middlewares/verify-user';
import { verify, sign } from 'jsonwebtoken'
import { getUserByUsername, getUserByUsernameAndPassword, createUser, updateTokenTimeOfUserDB, getTokenAndOptions } from '../services/auth-service';
import bcrypt from 'bcrypt'
import { cookieParser, cookie } from 'cookie-parser'
import { Errors } from '../util/UserErrors';
import { validateBodyUser } from './users-controller'

function validateBodyLogin(obj: Record<string, string>) {
    const { username, password } = obj
    if (!username || !password) {
        return Errors.FailedLoginError
    }
    const props = Object.entries(obj)
    const errors = props.reduce((errorsList: object[], pair: string[]) => {
        console.log(pair)
        const field: string = pair[0]
        const value = pair[1]
        if (field !== 'username' && field !== 'fullname' && field !== 'password' && field !== 'email') {
            errorsList.push(Errors.invalidProp)
        }
        if (field === 'username') {
            if (value.length <= 4) {
                errorsList.push(Errors.usernameLength)
            }
        } else if (field === 'password') {
            if (value.length < 8) {
                errorsList.push(Errors.password)
            }
        }
        return errorsList
    }, [{}])
    return errors

}

export async function login(req, res) {
    const errors = validateBodyLogin(req.body)
    if (!errors) {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);
        if (!user) {
            // res.sendStatus(401).json(Errors.FailedLoginError)
            res.send(Errors.FailedLoginError)
        }
        else if (await bcrypt.compare(password, user.password)) {
            const tokenDate = new Date().getTime()
            await updateTokenTimeOfUserDB(user._id, tokenDate)
            const tokenAndOptions = await getTokenAndOptions(user._id, tokenDate)
            res.cookie('cookieInsta', tokenAndOptions.token, tokenAndOptions.options)
            res.send(user.username)
        } else {
            // res.sendStatus(401).json(Errors.FailedLoginError)
            res.send(Errors.FailedLoginError)
        }
    } else {
        res.send(errors)
    }
}

export async function register(req, res) {
    const { email, username, password, fullname } = req.body
    if (!(email && username && password && fullname)) {
        console.log('gets here')
        return res.send(Errors.missedFields)
    }
    const errors = validateBodyUser(req.body)
    if (errors.length) {
        console.log('why')
        console.log(errors)
        return res.send(errors)
    }

    const user = await getUserByUsername(username);
    if (user) {
        return res.send(Errors.usernameExists)
    }
    try {
        const newUser = await createUser(req.body);
        console.log(username)
        return res.send('welcome ' + username)
    }
    catch {
        res.status(400).send({ message: 'oy' });
    }
}
