const express = require('express')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const cloudinary = require('cloudinary')
const dotenv = require('dotenv')

app = new express()

// load environment variables
dotenv.config()
console.log(process.env)

// create DB connection and initialize models
const dbConn = mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// create express-session store
const mongoStore = connectMongo(expressSession)

// create cloudinary object
cloudinary.config({
    'api_key': process.env.CLOUDINARY_API_KEY,
    'api_secret': process.env.CLOUDINARY_API_SECRET,
    'cloud_name': process.env.CLOUDINARY_USERNAME,
})

// create middlewares
const expressStaticMw = express.static('public')
const expressEdgeEngineMw = expressEdge.engine
const bodyParserJsonMw = bodyParser.json()
const bodyParserUrlEncodedMw = bodyParser.urlencoded({ extended: true })
const fileUploadMw = fileUpload()
const mongoStoreObj = new mongoStore({ mongooseConnection: mongoose.connection })
const expressSessionMw = expressSession({secret: process.env.EXPRESS_SESSION_SECRET_KEY, store: mongoStoreObj})
const postCreateMw = require('./middlewares/storePost')
const authMw = require('./middlewares/auth')
const connectFlashMw = connectFlash()
const redirectIfAlreadyLoggedInMw = require('./middlewares/redirectIfAlreadyLoggedIn')
const globalMw = require('./middlewares/global')
const pageNotFoundMw = require('./middlewares/pageNotFound')

// register middlewares
app.use(expressStaticMw)
app.use(expressEdgeEngineMw)
app.use(bodyParserJsonMw)
app.use(bodyParserUrlEncodedMw)
app.use(fileUploadMw)
app.use(expressSessionMw)
app.use(connectFlashMw)
// register custom Middleware
app.use("/posts/new", authMw)
app.use("/posts/store", authMw, postCreateMw)
app.use('/auth/register', redirectIfAlreadyLoggedInMw)
app.use('/auth/login', redirectIfAlreadyLoggedInMw)
app.use("/users/store", redirectIfAlreadyLoggedInMw)
app.use('/users/login', redirectIfAlreadyLoggedInMw)
app.use('/auth/logout', authMw)
app.use('*', globalMw)

// create controllers for rendering views
const getPostPageController = require('./controllers/getPost')
const homePageController = require('./controllers/home')
const createPostPageController = require('./controllers/createPost')
const aboutPageController = require('./controllers/about')
const contactPageController = require('./controllers/contact')
const registerPageController = require('./controllers/createUser')
const loginPageController = require('./controllers/login.js')
// create controllers for handling actions
const storePostActionController = require('./controllers/storePost')
const storeUserActionController = require('./controllers/storeUser')
const loginUserActionController = require('./controllers/loginUser')
const logoutUserActionContoller = require('./controllers/logoutUser')

// set views for rendering
app.set('views', __dirname + "/views")

// set routers/controllers for all paths
app.get("/", homePageController)
app.get("/post/:id", getPostPageController)
app.get("/posts/new", createPostPageController)
app.get("/about", aboutPageController)
app.get("/contact", contactPageController)
app.get("/auth/register", registerPageController)
app.get('/auth/login', loginPageController)
app.get("/auth/logout", logoutUserActionContoller)


app.post("/posts/store", storePostActionController)
app.post("/users/store", storeUserActionController)
app.post('/users/login', loginUserActionController)

app.use(pageNotFoundMw)

// start the app
app.listen(process.env.PROCESS_PORT, (req, resp) => {
    console.log("app listening on ", process.env.PROCESS_PORT)
})