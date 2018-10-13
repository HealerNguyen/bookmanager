const { Router } = require('express')
const csrf = require('csurf')

const csrfProtection = csrf({ cookie: true })
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
var cookieSession = require('cookie-session')
const { check, validationResult } = require('express-validator/check');
const moment = require('moment')

const db = mysql.createConnection({
    host: 'db4free.net',
    user: 'root_vuejs1',
    password: 'ngtuananh',
    database: 'test_dbvuejs1',
    multipleStatements: true
});

//connect
db.connect((err) => {});


const router = Router()


//GET count data 
router.get('/dashboard/count', function(req, res) {
    //count category
    let sql =   `SELECT COUNT(*) as total FROM categories`
    let sqll =   `SELECT COUNT(*) as total FROM users WHERE users.role = 0`
    let sqlll =   `SELECT COUNT(*) as total FROM authors`
    let sqllll =   `SELECT COUNT(*) as total FROM books`

    let query = db.query(`SELECT COUNT(*) as total FROM categories; SELECT COUNT(*) as total FROM users WHERE users.role = 0;
    SELECT COUNT(*) as total FROM authors; SELECT COUNT(*) as total FROM books`, (err, count) => {
        if (err) {
            throw err;
        } else {
            //console.log(count)
            res.json({countCate: count})
        }
    })
    
    
})
// connection.query('SELECT ?; SELECT ?', [1, 2], function(err, results) {
//     if (err) throw err;
  
//     // `results` is an array with one element for every statement in the query:
//     console.log(results[0]); // [{1: 1}]
//     console.log(results[1]); // [{2: 2}]
//   });


module.exports = router