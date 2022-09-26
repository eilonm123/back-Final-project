import { serviceGetUsers, serviceGetUserById, serviceUpdateUser, serviceDeleteUser } from '../services/users-service';
import { UserModel } from '../models/user';
import { verify } from 'jsonwebtoken'
import { Request, Response } from 'express';
import { notFound } from '../util/usersPosts';
import bcrypt from 'bcrypt'
import {validatyeIdLength} from '../middlewares/validatyeIdLength'


export async function getUsers(req: Request, res: Response) {
    const users = await serviceGetUsers()
    return res.send(users)

}

export async function getUserById(req: Request, res: Response) {
    const id = req.params.username
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

export async function validatePropsToUpdate(id, prop, value) {
    if (!validatyeIdLength(id)) {
        // console.log(id)
        // throw new Error('id must be 24 characters')
    } else {
        if (prop === 'password') {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(value, salt)
            return [prop, value]
        } else if (prop === 'username') {
            if (value.length >= 4) {
                return [prop, value]
            } else {
                return 'value must be more than 3 characters'
            }
        } else if (prop === 'email') {
            if (value.includes('@')) {
                return [prop, value]
            } else {
                return 'email must contain @'
            }
        } else if (prop === 'firstName' || prop === 'lastName') {
            return [prop, value]
        } else {
            return 'prop must be: firstName / lastName / username / password / email' // catch{res.status(400).send(err.message)}
        }
    }
}

export async function updateUser(req: Request, res: Response) { // go to auth flow
    const id = req.id
    try {
        const bodySplitted = Object.entries(req.body) // newProp: %@^*D#X
        const [prop, value] = bodySplitted[0]
        const validationResult = await validatePropsToUpdate(id, prop, value)
        if (typeof (validationResult) === 'object') {
            const updatedUser = await serviceUpdateUser(id, prop, value)
            await updatedUser.save()
            res.send(updatedUser)
        } else {
            res.send(validationResult)
        }

    } catch {
        res.send('send information')
    }

    // if (!validatyeIdLength(id)) {
    //     res['send']('id too long. need to be 24') // res.send(new Error.IdError) - utilez
    // } else {
    //     const bodySplitted = Object.entries(req.body) // newProp: %@^*D#X
    //     const [prop, value] = bodySplitted[0]
    //     if (prop === 'firstName' || prop === 'lastName' || (prop === 'username' && prop.length > 4) || prop === 'password' || prop === 'email') {
    //         const updatedUser = await serviceUpdateUser(id, prop, value)
    //         if (updatedUser) {
    //             res.send(updatedUser)
    //         } else {
    //             res.send(userNotFound())
    //         }
    //     } else {
    //         throw new Error('cant exccess DB')
    //     }
    // }
}

export async function deleteUser(req: Request, res: Response) { // כאן הבאתי יוזר ניים מהפרמס
    const id = req['params'].username /* gives an id */
    // TODO: only the current user can delete its own!
    if (!validatyeIdLength(id)) {
        res['send']('id too long. need to be 24')
    } else {
        const user = await serviceDeleteUser(id)
        if (user) {
            res.send(user)
        } else {
            res.send()
        }
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
        const {id, value} = req.body
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
