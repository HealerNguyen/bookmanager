const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const fs = require("fs")


const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
    // const session = require('express-session')
var cookieSession = require('cookie-session')

// const db = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'root_vuejs1',
//     password: 'ngtuananh',
//     database: 'test_dbvuejs1',
//     multipleStatements: true,
// });
// // a27630e7
// //connect
// db.connect((err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log('Mysql connected ...');
//     }
// });

const csrfProtection = csrf({ cookie: true })
    // Create express instnace
const app = express()

//body Parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser())

app.set('trust proxy', 1)
app.use(cookieSession({
    name: 'session',
    keys: ['key1'],
    maxAge: 60 * 60 * 1000
}))
    // Require API routes
const users = require('./routes/users')
const categories = require('./routes/categories')
const dashboard = require('./routes/dashboard')
const authors = require('./routes/authors')
const books = require('./routes/books')



// Import API Routes
app.use(users)
app.use(categories)
app.use(dashboard)
app.use(authors)
app.use(books)

// const isProd = process.env.NODE_ENV === 'production'
// const nuxt = new Nuxt({ dev: !isProd })
// // No build in production
// if (!isProd) {
//   const builder = new Builder(nuxt)
//   builder.build()
// }
// app.use(nuxt.render)
// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
}
