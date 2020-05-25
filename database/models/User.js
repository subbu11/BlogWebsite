const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        unique: [true, "Username should be unique"],
        required: [true, "Username is mandatory"],
    },
    email: {
        type: String,
        unique: [true, "Email should be unique"],
        required: [true, "Email is mandatory"],
    },
    password : {
        type: String,
        required: [true, "Password is mandatory"], 
    },
})

userSchema.pre('save', function(next) {
    console.log("hook save got called")
    const user = this
    bcrypt.hash(user.password, 10, function (err, encrpyted_password) {
        console.log("computed hash of password", encrpyted_password)
        user.password = encrpyted_password
        next()
    })
})

const User = mongoose.model("User", userSchema)

module.exports = User