const edge = require('edge.js')

module.exports = (req, rsp, next) => {
    console.log("==== global middleware ====")
    
    edge.global('isAuthenticated', false)
    
    if (req.session.userId) {
        console.log("==== global middleware --> User is authenticated ====")
        edge.global('isAuthenticated', true)
    }
    next()
}