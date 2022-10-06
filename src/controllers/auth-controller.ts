import verifyUser from '../middlewares/verify-user';
import { verify, sign } from 'jsonwebtoken'
import { getUserByUsername, getUserByUsernameAndPassword, createUser, updateTokenTimeOfUserDB, getTokenAndOptions } from '../services/auth-service';
import bcrypt from 'bcrypt'
import { cookieParser, cookie } from 'cookie-parser'
import { createError, Errors } from '../util/createUserErrors';
import { validateBodyUser } from './users-controller'

function validateBodyLogin(obj) {
    const { username, password } = obj
    if (username && password) {
        const props = Object.entries(obj)
        const errors = props.reduce((errorsList, pair) => {
            const field = pair[0]
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
        }, [])
        return errors
    } else {
        return Errors.FailedLoginError
    }

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
    if (email && username && password && fullname) {
        const { username } = req.body
        const errors = validateBodyUser(req.body)
        if (!errors) {
            const user = await getUserByUsername(username);
            if (user) {
                res.send(Errors.usernameExists)
            } else {
                try {
                    const newUser = await createUser(req.body);
                    res.send('welcome ' + username)
                }
                catch {
                    res.status(400).send({ message: 'oy' });
                }
            }
        } else {
            res.send(errors)
        }
    } else {
        res.send(Errors.missedFields)
    }

}



