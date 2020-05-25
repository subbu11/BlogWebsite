module.exports = (req, rsp, next) => {
    console.log("[postCreateMiddleware] Hit with next", next)
    if (! req.files 
        || !req.files.image 
        || !req.body.title
        || !req.body.subtitle
        || !req.body.content) {
            return rsp.redirect('/posts/new')
        }
    next()
};