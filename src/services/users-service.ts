import { UserModel } from "../models/user";

export async function serviceGetUsers() {
    const users = await UserModel.find()
    return (users)
}

export async function serviceGetUserById(id) {
    const user = await UserModel.findOne({ _id: id })
    return user
}

export async function serviceGetUserByUsername(username) {
    const user = await UserModel.findOne({ username: username })
    return user
}

export async function serviceUpdateUser(id, prop: String, value) {
    const user = await UserModel.findOneAndUpdate({ _id: id }, { $set: { [prop]: value } }, {
        new: true
    });
    return user
}

export async function serviceDeleteUser(id) {
    const user = await UserModel.findOneAndDelete({_id: id})
    return user
}

// serviceGetFollowing