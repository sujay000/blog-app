const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')
// const { v4: uuidv4 } = require('uuid')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const port = 3000

async function connectDBMongo(params) {
    await mongoose.connect(process.env.MONGO_URI.toString())
    console.log(`connected to DB`)
}

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    createdBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})
const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
})
const User = mongoose.model('User', userSchema)
const Blog = mongoose.model('Blog', blogSchema)

let mysecret = 'MY_SECRECT'

function notFoundMiddleware(req, res, next) {
    res.status(404).send({ message: `not found any valid route` })
}

function authMiddleware(req, res, next) {
    let token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, mysecret, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        let username = data
        User.findOne({ username }).then((user) => {
            if (!user) res.status(401).send({ message: `invalid credentials auth middleware` })
            else {
                req.username = username
                next()
            }
        })
    })
}

app.post('/login', async (req, res) => {
    let { username, password } = req.body
    let user = await User.findOne({ username, password })
    if (user) {
        let token = jwt.sign(username, mysecret)
        res.status(200).send({
            message: 'you have logged successfully',
            token,
        })
    } else {
        res.status(401).send({ message: `Invalid credentials for login` })
    }
})

app.post('/signup', async (req, res) => {
    let { username, password } = req.body

    let user = await User.findOne({ username: username })

    if (!user) {
        let token = jwt.sign(username, mysecret)

        let user = new User({ username, password, createdBlogs: [] })
        await user.save()

        res.status(200).send({
            message: 'successfull signup',
            token,
        })
    } else {
        res.status(401).send({ message: `user ${username} already present` })
    }
})

app.post('/createBlog', authMiddleware, async (req, res) => {
    let { title, description } = req.body
    let username = req.username // attached during the authMiddleware

    const blog = new Blog(req.body)
    await blog.save()

    let user = await User.findOne({ username: username })
    console.log(user)
    user.createdBlogs.push(blog)
    await user.save()

    res.status(200).send({ message: `blog created successfully`, id: blog.id })
})

app.get('/myblogs', authMiddleware, async (req, res) => {
    let username = req.username
    try {
        let user = await User.findOne({ username }).populate('createdBlogs')
        res.status(200).send({ blogs: user.createdBlogs })
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'unable to get your blogs' })
    }
})

app.put('/updateBlog/:id', authMiddleware, async (req, res) => {
    let { title, description } = req.body
    let id = req.params.id

    const blg = await Blog.findByIdAndUpdate(id, { title, description }, { new: true })
    if (blg) {
        res.status(200).send({ message: 'updated the blog' })
    } else {
        res.status(400).send({ message: `blog was not found` })
    }
})

app.get('/allBlogs', authMiddleware, async (req, res) => {
    const BLOGS = await Blog.find({})
    res.status(200).send({ blogs: BLOGS })
})

app.delete('/blog/:id', async (req, res) => {
    let id = req.params.id
    const blg = await Blog.findByIdAndDelete(id)
    res.status(200).send({ message: `deleted successfully` })
})

app.get('/blog/:id', async (req, res) => {
    let id = req.params.id
    const blog = await Blog.findById(id)
    res.status(200).send({ blog })
})

app.use(notFoundMiddleware)

app.listen(port, () => {
    console.log(`listening on ${port}`)
    connectDBMongo()
})

/*
USERS = [
    {
        username:...,
        password:...,
        createdBlogs:[blogID1, blogID2]...,
    }
]

BLOGS = [
    {   
        id: ..
        title: ...
        description: ..
    }
]


{
    "blogs": [
        {
            "_id": "650683f60edf1a641b784b6e",
            "title": "how to do ",
            "description": "it is desc",
            "__v": 0
        }
    ]
}


*/
