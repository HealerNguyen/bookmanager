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

function formatDateTime(datetime) {
    return moment(datetime.toISOString().replace(/T/, ' ').replace(/\..+/, '')).format('DD/MM/YYYY')
}

//Edit author
router.post('/authors/edit', function(req, res) {
    console.log(req.body)
    const status = req.body.data.status
    const id = req.body.data.id
    const name = req.body.data.name
    const gender = req.body.data.gender
	const birthday = req.body.data.date
	const email = req.body.data.email

    let sql = `UPDATE authors SET authors.name = '${name}', authors.gender =  '${gender}', authors.status =  '${status}', authors.email =  '${email}' , authors.birthday =  '${birthday}' WHERE authors.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Chỉnh sửa tác giả thành công', stt: true})
        }
    })
})

//Get by id
router.post('/authors/getByIds', function(req, res) {
    const id = req.body.id

    let sql = `SELECT * FROM authors WHERE authors.id = '${id}'`

    let query = db.query(sql, (err, author) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({author:author[0]})
        }
    })
})

//Add author
router.post('/authors/add', function(req, res) {
    const name = req.body.data.name
    const status = req.body.data.status
    const date = req.body.data.date
    const gender = req.body.data.gender
    const email = req.body.data.email
    const image = req.body.data.image

    let sql = `SELECT * FROM authors  WHERE authors.email = '${email}'`

    let query = db.query(sql, (err, author) => {
        if (err) {
            //throw err;
            //console.log(err);
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        }

        if (!author[0]) {
            let author = { name: name, email: email ,gender: gender,image:image, status: status, birthday: date }
            let sql = `INSERT INTO authors SET ?`
            let query = db.query(sql, author, (err) => {
                if (err) {
                    //throw err;
                    res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
                } else {
                    res.json({msg: 'Thêm mới tác giả thành công', stt: true})
                }
            })
        } else {
            res.json({msg: 'Ops!, Email này đã có người sử dụng', stt: false})
        }
    })

})

//Delete author
router.post('/authors/delete', function(req,res) {
    const id = req.body.id

    let sql = `DELETE FROM authors WHERE authors.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Xóa tác giả thành công', stt: true})
        }
    })
})

//GET all author
router.get('/authors/authors', function(req, res) {
    //console.log(req)
    $dataPerRow = 5;
    $totalRows = 0;
    $pageNumber = req.query.page;
    $query = req.query.query;
    $status = req.query.status;
    $gender = req.query.gender;

    $offset = $pageNumber * $dataPerRow;
    
    let sql =   `SELECT * FROM authors WHERE 1 = 1 `
    if ($query !== '') {
        sql +=  ` AND authors.name LIKE '%${$query}%' `
    }
    if ($status !== '') {
        sql +=  ` AND authors.status = ${$status} `
    }

    if  ($gender !== '') {
        sql += ` AND authors.gender = ${$gender} `
    }
    //console.log(sql)
    //check for query search
    //get total data
    let query = db.query(sql, (err, authors) => {
        if (err) {
            throw err;
        } else {
            $totalRows = authors.length
            sql += ` ORDER BY created_date DESC LIMIT ${$dataPerRow} OFFSET ${$offset}`

            //console.log(sql)
            let query1 = db.query(sql, (err, authors) => {
                if (err) {
                    throw err;
                } else {
                    for (i in authors) {
                        authors[i].created_date = formatDateTime(authors[i].created_date)
                        authors[i].updated_date = formatDateTime(authors[i].updated_date)
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
                    res.json({authors: authors, isShow: $isShow, totalRows: $totalRows})
                }
            })

        }
    })
})

router.get('/authors/authors-search', function(req, res) {
    let sql =   `SELECT id, name FROM authors WHERE 1 = 1 `
    let query = db.query(sql, (err, authors) => {
        if (err) {
            throw err;
        } else {
            res.json({authors: authors})
        }
    })
})



module.exports = router