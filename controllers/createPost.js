module.exports = (req, rsp) => {
    console.log("========= /posts/new hit ==========")
    if (req.session.userId) {
        console.log("user session exists")
        return rsp.render('create')
    }
    rsp.redirect('/auth/login')
};