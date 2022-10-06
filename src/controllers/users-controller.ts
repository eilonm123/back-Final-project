import { serviceGetUsers, serviceGetUserById, serviceUpdateUser, serviceDeleteUser, serviceGetUserByUsername, serviceCreateUser } from '../services/users-service';
import { UserModel } from '../models/user';
import { verify } from 'jsonwebtoken'
import { Request, Response } from 'express';
import { notFound } from '../util/usersPosts';
import bcrypt from 'bcrypt'
import { validatyeIdLength } from '../middlewares/validatyeIdLength'
import { Errors } from '../util/createUserErrors'


export async function getUsers(req: Request, res: Response) {
    const users = await serviceGetUsers()
    return res.send(users)

}

export function validateBodyUser(obj) {
    const fieldsArray = Object.keys(obj)
    const errors = fieldsArray.reduce((errorsArray, field) => {
        console.log(errorsArray)
        if (field !== 'username' && field !== 'fullname' && field !== 'password' && field !== 'email') {
            errorsArray.push(Errors.invalidProp)
        }
        if (field === 'username') {
            if (obj[field].length <= 4) {
                errorsArray.push(Errors.usernameLength)
            }
        } else if (field === 'fullname') {
            if (!obj[field].includes(' ')) {
                errorsArray.push(Errors.fullname)
            }
        }
        if (field === 'password') {
            if (obj[field].length < 8) {
                errorsArray.push(Errors.password)

            }
        } else if (field === 'email') {
            if (!obj[field].includes('@')) {
                errorsArray.push(Errors.email)

            }
        }
        return errorsArray
    }, [])
    return errors
}


export async function createUser(req: Request, res: Response) {
    const { email, username, password, fullname } = req.body
    if (email && username && password && fullname) {
        const usernameExists = serviceGetUserByUsername(username)
        if (!usernameExists) {
            const result = validateBodyUser(req.body)
            if (result.length === 0) {
                const user = await serviceCreateUser(req.body)
                if (user) {
                    res.send(user)
                }
            } else {
                res.send(result)
            }
        } else {
            res.send('username already Exists. choose different one')
        }
    } else {
        res.send(Errors.missedFields)
    }

}

export async function getUserById(req: Request, res: Response) {
    const id = req.params.userId
    console.log('working')
    console.log(id)
    const isValid = validatyeIdLength(id)
    if (isValid) {
        const user = await serviceGetUserById(id)
        if (user) {
            return res['send'](user)
        } else {
            return res['send'](`user ${notFound()}`)
        }
    } else {
        res.status(401).send()
    }


}
export async function getUserByUsername(req: Request, res: Response) {
    const username = req.params.username
    const user = await serviceGetUserByUsername(username)
    if (user) {
        return res.send({ username: user.username, email: user.email, following: user.following })
    } else {
        // res.send()
        res.status(401).send()

    }


}



export async function updateUser(req: Request, res: Response) { // go to auth flow
    const idParams = req.params.userId
    const idVerify = req.id.valueOf()
    if (idParams === idVerify) {
        const errors = validateBodyUser(req.body)   /* { [name]: name, [genre]: genre, "author": author, "similar": similar} */
        if (!errors.length) {
            const body = req.body
            const bodyList = Object.entries(body)
            // console.log(bodyList) /* [ [ 'password', '123456789' ], [ 'username', 'shakshuuu' ] ] */
            const result = {}
            bodyList.forEach((pair) => {
                const key = pair[0]
                const value = pair[1]
                result[key] = value
            })
            const updatedUser = await serviceUpdateUser(idVerify, result)
            if (updatedUser) {
                res.send(updatedUser)
            }
        } else {
            res.send(errors)
        }
    }
}

export async function deleteUser(req: Request, res: Response) { // כאן הבאתי יוזר ניים מהפרמס
    const idParams = req.params.userId /* gives an id */
    // TODO: only the current user can delete its own!
    const idVerify = req.id.valueOf()
    console.log(idVerify)
    console.log(idParams)
    if (idVerify === idParams) {
        if (!validatyeIdLength(idVerify)) {
            res['send']('id too long. need to be 24')
        } else {
            const user = await serviceDeleteUser(idVerify)
            if (user) {
                res.send(user)
            } else {
                res.send('user hasnt found')
            }
        }
    } else {
        res.send('cant remove user who isnt you')
    }
}

// export async function getFollowers(req: Express.Request, res: Express.Response) {
//     // const id = req.user.id

// }

// export async function getMyFollowing(req: Express.Request, res: Express.Response) { // להביא ביצוע של פולו
//     const token = req['cookies']['cookieInsta']
//     const verifiedToken = (verify(token, process.env.SECRET))
//     const id = verifiedToken.signAt.id
//     const userFollowing = await serviceGetUserById(id)
//     console.log(userFollowing['following'])

// }

export async function follow(req: Request, res: Response) { // using graph QL: (mutation, query, subscribtion, execution). not CRUD
    // const id = req.params.username
    const isValidId = validatyeIdLength(req.id)
    if (isValidId) {
        const user = await serviceGetUserById(req.id)
        const { id, value } = req.body
        if (id === 'id') {
            if (validatyeIdLength(value)) {

            } else {

            }
        }
    }
    // const token = req['cookies']['cookieInsta']
    // const verifiedToken = (verify(token, process.env.SECRET))
    // const id = verifiedToken.signAt.id
    // const username = req['body'].username
    // console.log(username)
}
