const User = require('../database/models/User')
const bcrypt = require('bcryptjs')

module.exports = (req, rsp) => {
    console.log("===== /users/login =====")

    User.findOne({
        email: req.body.email,
    }, (err, user) => {

        if (err) {
            console.log("Error in finding user", err)
            return rsp.redirect("/auth/login")
        }

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isSame) => {
                if (isSame) {
                    console.log("password matched")
                    console.log("Assigning session-id " + user._id + " to user " + req.body.email)
                    req.session.userId = user._id

                    return rsp.redirect("/")
                }
                else {
                    console.log("password not matched")
                    return rsp.redirect("/auth/login")
                }
            })   
        }
        else{
            console.log("user not found")
            return rsp.redirect("/auth/login")
        }
    })
}