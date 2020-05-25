// This middleware redirects the user to "home" if he already logged-in

module.exports = (req, rsp, next) => {
    console.log("==== redirectIfAlreadyLoggedIn middleware ====")

    if (req.session.userId) {
        console.log("==== user already logged in ====")
        return rsp.redirect('/')
    }
    
    next()
}