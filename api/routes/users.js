const { Router } = require('express')
const csrf = require('csurf')

const csrfProtection = csrf({ cookie: true })
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
    // const session = require('express-session')
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


function formatDateTime(datetime) {
    return moment(datetime.toISOString().replace(/T/, ' ').replace(/\..+/, '')).format('DD/MM/YYYY')
}

//get by id
router.post('/users/getByIds', function(req, res) {
    const id = req.body.id

    let sql = `SELECT * FROM users WHERE users.id = '${id}'`

    let query = db.query(sql, (err, user) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({user:user[0]})
        }
    })
})

//Edit user admin
router.post('/users/edit', function(req, res) {
    console.log(req.body)
    const status = req.body.data.status
    const id = req.body.data.id
    const name = req.body.data.name
    const gender = req.body.data.gender
	const birthday = req.body.data.date
    const email = req.body.data.email
    const phone = req.body.data.phone
    const address = req.body.data.address

    let sql = `UPDATE users SET users.name = '${name}', users.gender =  '${gender}', users.status =  '${status}', users.email =  '${email}' , users.birthday =  '${birthday}', users.phone =  '${phone}', users.address =  '${address}' WHERE users.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Chỉnh sửa thành viên thành công', stt: true})
        }
    })
})

//Admin get all user
router.get('/users/usersall', function(req, res) {
    //console.log(req)
    $dataPerRow = 5;
    $totalRows = 0;
    $pageNumber = req.query.page;
    $query = req.query.query;
    $status = req.query.status;
    $gender = req.query.gender;

    $offset = $pageNumber * $dataPerRow;
    
    let sql =   `SELECT * FROM users WHERE 1 = 1 AND users.role = 0 `
    if ($query !== '') {
        sql +=  ` AND users.name LIKE '%${$query}%' `
    }
    if ($status !== '') {
        sql +=  ` AND users.status = ${$status} `
    }

    if  ($gender !== '') {
        sql += ` AND users.gender = ${$gender} `
    }
    //console.log(sql)
    //check for query search
    //get total data
    let query = db.query(sql, (err, users) => {
        if (err) {
            //throw err;
            console.log(err);
        } else {
            $totalRows = users.length
            sql += ` ORDER BY created_at DESC LIMIT ${$dataPerRow} OFFSET ${$offset}`

            //console.log(sql)
            let query1 = db.query(sql, (err, users) => {
                if (err) {
                    throw err;
                } else {
                    for (i in users) {
                        users[i].created_at = formatDateTime(users[i].created_at)
                        users[i].updated_at = formatDateTime(users[i].updated_at)
                    }
                    $isShow = false;
                    $totalPage = parseInt($totalRows / $dataPerRow);
                    if ($totalRows % $dataPerRow > 0) {
                        $totalPage += 1;
                    }
                    if ($pageNumber >= ($totalPage - 1)) {
                        $isShow = false;
                    } else {
                        $isShow = true;
                    }
                    // them data o tren const van chay binh thuong --
                    // console.log($totalRows + '---')
                    // console.log($dataPerRow)
                    res.json({users: users, isShow: $isShow, totalRows: $totalRows})
                }
            })

        }
    })
})

//Delere user by it
router.post('/users/delete', function(req,res) {
    const id = req.body.id

    let sql = `DELETE FROM users WHERE users.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Xóa thành viên thành công', stt: true})
        }
    })
})

//Delete account by clientId
router.post('/users/deleteAccount', (req, res) => {
    const email = req.body.email
    const clientId = req.body.clientId

    var deleteDatas = [[email,clientId]];

    let sql = `DELETE FROM user_sessions WHERE (email, client_id) IN (?)`
    let query = db.query(sql,[deleteDatas], (err, user) => {
        if (err) {
            console.log(err)
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {
            let sqll = `SELECT DISTINCT users.email, users.name, users.image from users, user_sessions WHERE users.email = user_sessions.email and user_sessions.client_id = '${clientId}'`
            let queryl = db.query(sqll, (err, account) => {
                if (err) {
                    throw err;
                } else {
                    console.log(account);
                    res.json(account); 
                }
            })
        }
    })

})

//User Edit Profile

router.post('/users/userEditProfile', (req, res) => {
    const name = req.body.data.name
    const email = req.body.data.email 
    const phone = req.body.data.phone 
    const address = req.body.data.address 
    const date = req.body.data.date
    const id = req.body.data.id

    let sql = `UPDATE users SET users.email = '${email}', users.name = '${name}', users.phone = '${phone}', users.birthday = '${date}', users.address = '${address}' WHERE users.id = ${id}`
    let query = db.query(sql, (err, user) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {
            //console.log(user[0])
            res.json({msg: 'Sửa thông tin thành công', stt: true})
        }
    })
})

//Get user by email
router.post('/users/getUserByMail', (req, res) => {
    const email = req.body.dataEmail
    let sql = `SELECT * FROM users  WHERE users.email = '${email}'`

    let query = db.query(sql, (err, user) => {
        if (err) {
            throw err;
            console.log(err);
        }

        if (!user[0]) {
            res.json({msg: 'Tài khoản không tồn tại', stt: false});
        } else {
            res.json(user[0]);
        }
    })
})

//Get account by clientId
router.post('/getAccountByClientId', (req, res) => {
    const clientId  =  req.body.clientId
    let sql = `SELECT DISTINCT users.email, users.name, users.image from users, user_sessions WHERE users.email = user_sessions.email and user_sessions.client_id = '${clientId}'`
    let query = db.query(sql, (err, account) => {
        if (err) {
            throw err;
        } else {
            console.log(account);
            res.json(account); 
        }
    })
})
//Login user
router.post('/users/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const clientId = req.body.clientId

    let sql = `SELECT * FROM users  WHERE users.email = '${email}'`

    let query = db.query(sql, (err, user) => {
        if (err) {
            throw err;
            console.log(err);
        }

        if (!user[0]) {
            console.log('No user found')
            res.json({msg: 'Tài khoản không tồn tại', stt: false})

        } else {
            bcrypt.compare(password, user[0].password, function(err, isMatch, userData) {
                if (err) {
                    throw err;
                }
                console.log('---isMatch---');
                console.log(isMatch);
                if (isMatch) {
                    let userData = user[0]
                        // save session
                        //var sessData = req.session;
                    req.session.email = userData.email;
                    req.session.name = userData.name;
                    req.session.avatar = userData.image;
                    res.json({msg: 'Password match', stt: true})
                } else {
                    res.json({msg: 'Mật khẩu không chính xác', stt: false})
                }
            })
        }

    })

    let day = moment().format('YYYY-MM-DD hh:mm:ss');

    let user = { email: email, client_id: clientId, last_login: day}
    let sqll = `INSERT INTO user_sessions SET ?`
    let queryl = db.query(sqll, user, (err, user) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {
            
        }
    })
})

//session status
router.get('/sessionStatus', (req, res) => {
    console.log('getting session...')
    console.log(req.session);
    res.json(req.session)
})

//logout 
router.post('/logout', (req, res) => {
    console.log('logging out...')
    req.session = null
    res.json('logout out')
})

//Register user
router.post('/users/register', (req, res) => {
   // console.log(req.body)
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password
    var clientId = req.body.clientId
    var image = req.body.image
    var OS = req.body.OS
    var browser = req.body.browser

    let sql = `SELECT * FROM users  WHERE users.email = '${email}'`

    let query = db.query(sql, (err, user) => {
        if (err) {
            //throw err;
            //console.log(err);
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        }

        if (!user[0]) {
            //console.log('No user found')
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        throw err;
                    } else {
                        password = hash;
                        let user = { name: name, email: email, password: password, image: image, role: '0', gender: '1', client_id: clientId, status: '1' }
                        users =  user;
                        //console.log(users);
                        let sql = `INSERT INTO users SET ?`
                        let query = db.query(sql, user, (err, user) => {
                            if (err) {
                                //throw err;
                                res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
                            } else {
                                //console.log(users);
                                req.session.email = users.email;
                                req.session.name = users.name;
                                req.session.avatar = users.image;  
                                res.json({msg: 'Đăng ký tài khoản thành công', stt: true})
                            }
                        })
                    }
                })
            })
        } else {
            res.json({msg: 'Ops!, Tài khoản đã có người sử dụng', stt: false})
        }
    })

    let day = moment().format('YYYY-MM-DD hh:mm:ss');

    let user = { email: email, client_id: clientId, last_login: day}
    let sqll = `INSERT INTO user_sessions SET ?`
    let queryl = db.query(sqll, user, (err, user) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {
            
        }
    })
})

// router.get('/getcsrftoken', csrfProtection, function(req, res) {
//     return res.json({ csrfToken: req.csrfToken() });
// })

// //verifyToken
// function verifyToken(req, res, next) {

//     const token = req.query.token || req.body.token
//     if (typeof token !== 'undefined') {

//         req.token = token;

//         next();

//     } else {
//         res.sendStatus(403);
//     }
// }

module.exports = router