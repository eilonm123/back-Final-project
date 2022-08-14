const mongoose = require('mongoose');
// const bcrypt = require('becrypt')


const UserSchema = new mongoose.Schema({ // value's first letter must be a capital letter
    numberOfTodos: Number,
    firstName: {type: String, required: true, validate: (value) => {!value.includes('-')}},
    lastName: {type: String, required: true, validate: (value) => {!value.includes('-')}},
    created: {type: Date, default: Date.now},
    userName: {type: String, required: true, valIdate: (value) => {!value.length < 4}, unique: true},
    password: {type: String, required: true},
    email: {type: String, validate: (value) => {value.includes('@')}}
    })

    // UserSchema.pre('save', async function(next) {
    //     try {
    //         const salt = bcrypt.genSalt(10)
    //         console.log(this.email + ', ' + this.password)
    //         const hashedPassword = await bcrypt.hash(this.password, salt)
    //         this.password = hashedPassword
    //         next()
    //     }
    //     catch(error) {
    //         console.log(error)
    //     }
    // })

    const UserModel = mongoose.model('User', UserSchema) // you have to put a capital letter in the first parameter



module.exports = {UserModel}