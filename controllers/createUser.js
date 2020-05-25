module.exports = (req, rsp) => {
    console.log("========= /auth/register hit ==========")
    rsp.render('register', {
        errors: req.flash('authRegisterErrors'),
        data: req.flash('data')[0],
    })
};