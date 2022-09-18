import { serviceGetUsers, serviceGetUserById, serviceUpdateUser, serviceDeleteUser } from '../services/users-service';
import { UserModel } from '../models/user';
import {verify} from 'jsonwebtoken'

export async function getUsers(req: Express.Request, res: Express.Response) {
    const users = await serviceGetUsers()
    return res['send'](users)

}
export function validatyeIdLength(id) {
    if (id.length == 24) {
        return true
    } else {
        return false
    }
}

export async function getUserById(req: Express.Request, res: Express.Response) {
    const id = req['params'].username
    validatyeIdLength(id)
    const user = await serviceGetUserById(id)
    if (user) {
        return res['send'](user)
    } else {
        return res['send']('user not found')
    }

}

export async function updateUser(req: Express.Request, res: Express.Response) {
    const id = req['params'].username
    if (!validatyeIdLength(id)) {
        res['send']('id too long. need to be 24')
    } else {
        const bodySplitted = Object.entries(req['body'])
        const [prop, value] = bodySplitted[0]
        const updatedUser = await serviceUpdateUser(id, prop, value)
        if (updatedUser) {
            res['send'](updatedUser)
        } else {
            res['send']('user didnt found')
        }
    }
}

export async function deleteUser(req: Express.Request, res: Express.Response) { // כאן הבאתי יוזר ניים מהפרמס
    const id = req['params'].username /* gives an id */
    if (!validatyeIdLength(id)) {
        res['send']('id too long. need to be 24')
    } else {
        const user =  await serviceDeleteUser(id)
        if (user) {
            res['send'](user)
        }
    }
}

    // export async function getFollowers(req: Express.Request, res: Express.Response) {
    //     // const id = req.user.id

    // }

    export async function getMyFollowing(req: Express.Request, res: Express.Response) { // כאן הבאתי עם TOKEN
        const token = req['cookies']['cookieInsta']
        const verifiedToken = (verify(token, process.env.SECRET))
        const id = verifiedToken.signAt.id
        const userFollowing = await serviceGetUserById(id)
        console.log(userFollowing['following'])

    }

    export async function follow(req: Express.Request, res: Express.Response) {
        const token = req['cookies']['cookieInsta']
        const verifiedToken = (verify(token, process.env.SECRET))
        const id = verifiedToken.signAt.id
        const username = req['body'].username
        console.log(username)
    }
