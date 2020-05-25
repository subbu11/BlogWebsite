const Post = require('../database/models/Post')

module.exports = async (req, rsp) => {
    console.log("====== Post =======")
    const post = await Post.findById(req.params.id).populate('author')
    rsp.render('post', { post })
};