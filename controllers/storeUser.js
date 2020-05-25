const User = require('../database/models/User')

module.exports = (req, rsp) => {
    console.log("======== /users/store hit =======")
    
    console.log(req.body)

    User.create(req.body, (err, user) => {
        if (err) {
            console.log("create-user: error:", err)
            const storeUserErrors = Object.keys(err.errors).map(key => err.errors[key].message)
            req.flash('authRegisterErrors', storeUserErrors)
            req.flash('data', req.body)
            console.log(req.flash('authRegisterErrors'))
            console.log(req.flash('data'))
            return rsp.redirect("/auth/register")
        }
        console.log("create-user: Successfully created", err)
        rsp.redirect("/")
    })
   
};