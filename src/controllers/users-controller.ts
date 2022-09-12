// import userService from '../services/users-service';

export async function getUser(req, res) {
    const id = req.user.id
    if (id) {
        console.log(id)
        // const todosOfUser = await userService.getUser(id)
        // if (todosOfUser) {
        //     res.send(todosOfUser)
        // } else {
        //     res.send({ messege: "user doesn't exists" })
        // }

    } else {
        res.send({ messege: "insert an ID" })
    }
}

module.exports = { getUser }