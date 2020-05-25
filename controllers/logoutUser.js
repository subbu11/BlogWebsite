module.exports = (req, rsp) => {
    req.session.destroy(() => {
        rsp.redirect("/")
    })
}