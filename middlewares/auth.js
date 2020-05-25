// This middleware redirects the user to "login" if he tries to create a post
const User = require('../database/models/User')

module.exports = (req, rsp, next) => {
    console.log("==== auth middleware ====")

    if (! req.session.userId) {
        console.log("==== auth middleware :: user not logged in ====")
        return rsp.redirect('/auth/login')
    }

    User.findById(req.session.userId, (err, user) => {
        if (err || !user) {
            console.log("==== auth middleware :: user not logged in ====")
            return rsp.redirect('/auth/login')
        }

        next()
    })
    
}