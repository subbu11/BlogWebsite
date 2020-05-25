const Post = require('../database/models/Post')

module.exports = async (req, rsp) => {
    console.log("session", req.session)
    const posts = await Post.find({}).populate('author')
    rsp.render('index', {
        posts
    })
};