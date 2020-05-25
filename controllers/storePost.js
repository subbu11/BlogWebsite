const path = require('path')
const Post = require('../database/models/Post')
const cloudinary = require('cloudinary')

module.exports = (req, rsp) => {
    console.log("======== /posts/store hit =======")
    console.log(req.files)
    const { image } = req.files
    console.log(image)
    console.log(req.body)

    const localPath = path.resolve(__dirname, "../public/uploads", image.name)
    
    image.mv(localPath, (error) => {

        cloudinary.v2.uploader.upload(localPath, (err, result) => {
            console.log("uploading image")
            if (err) {
                console.log("Failed to upload : ", err)
                return rsp.redirect("/")
            }
            console.log("Uploaded image to ", result.secure_url)  
            Post.create({
                ...req.body,
                author: req.session.userId,
                image: result.secure_url
                },  (err, post) => {
                            rsp.redirect("/")
                    })
        })
        })
};