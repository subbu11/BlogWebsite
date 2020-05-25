const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true, useUnifiedTopology: true })

// test Post Model
const Post = require('../database/models/Post')

// test create
Post.create({
    title: "First test title",
    description: "First test description",
    content: "First test content",
}, (error, post) => {
    console.log("Create FIRST", error, post)
})

Post.create({
    title: "Second test title",
    description: "Second test description",
    content: "Second test content",
}, (error, post) => {
    console.log("Create SECOND", error, post)
})

// find all post
Post.find({}, (error, rsp) => {
    console.log("Find ALL", error, rsp)
})

// find first post
Post.find({
    title: "First test title" 
}, (error, rsp) => {
    console.log("Find FIRST", error, rsp)
})

// no post found
Post.find({
    title: "dummy post" 
}, (error, rsp) => {
    console.log("Not Found", error, rsp)
})