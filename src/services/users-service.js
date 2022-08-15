// const { errorMonitor } = require('events');
const { UserModel } = require('../models/user');
const {getUserById} = require('./auth-service')


async function getUser(userId) {
    const user = await UserModel.findById(userId)
    .then(()=> {
        return user
    }).catch(err => {
        throw new Error(err)
    })
}




async function deleteToDo(id) { //  Cannot access 'removedTodo' before initialization
    try{
        let removedTodo = await TodoModel.findByIdAndDelete(id) // why the value is: null ???? 
        removedTodo.save()
        return removedTodo
    }catch {
        throw new Error('id isnt correct')
    }

    
}

async function getTodos() {
    const todos = await TodoModel.find({}).populate('user')
    return todos
}
// function addToDo(todo, userId) { // object as param * not async!
//     const todos = getToDos();
//     const newTodo = {
//         id: Math.random().toString().slice(3, 8),
//         task: todo.task || 'no task',
//         created: new Date(),
//         isDone: todo.isDone || false,
//         priority: todo.priority || 1,
//         userId: userId // get it from: req.user.id
//     }
//     todos.push(newTodo);
//     setToDos(todos);
//     return newTodo;
// }



// function deleteToDo(id) {
//     const todos = getToDos();
//     const filterdTodos = todos.filter(function(todo) {
//         return todo.id !== id;
//     });
//     setToDos(filterdTodos);
//     const removedTodo = todos.filter(function(todo) {
//         return todo.id === id
//     })
//     return removedTodo
// }



// async function updateToDo(todoId, {task, priority, isDone}) { // how to do it like that: updateToDo(todoId, { task, isDone, priority }
//     const todos = getToDos();

//     const updatedToDo = todos.find(todo => {
//         return todo.id === todoId
//     })

//     const newTodo = await TodoModel.findByIdAndUpdate(todoId, {task, priority, isDone})

//     if (task) {
//         updatedToDo.task = task;
//     }
//     if (typeof(isDone) === 'boolean') {
//         updatedToDo.isDone = isDone;
//     }
//     if (Number(priority)) {
//         updatedToDo.priority = priority;
//     }

//     setToDos(newToDos);
//     return updatedToDo;
// }

 async function getToDosOfUser(userId){
        // const todos = getToDos();
        const userTodos = await TodoModel.find({user: userId})
    //     const userTodos = todos.filter(function(todo) {
    //     return userId === todo.userId;
    // })
    if (userTodos) {
        return userTodos
    } else {
        return Error.massage
    }
}

module.exports = {
    getUser
}



