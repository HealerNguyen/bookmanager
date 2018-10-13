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
router.post('/books/edit', function(req, res) {
    const name = req.body.book.name
    const id = req.body.id
    const status = req.body.status
    const category = req.body.category
    const author = req.body.author
    const price = req.body.book.price
    const description = req.body.book.description
    const shortDescription = req.body.book.short_description
    const slug = req.body.book.slug
    const image = req.body.image

    let sql = `UPDATE books SET books.name = '${name}', books.image = '${image}', books.slug = '${slug}', books.price = '${price}',books.description = '${description}',books.short_description = '${shortDescription}', books.status =  '${status}', books.category_id =  '${category}', books.author_id =  '${author}' WHERE books.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Chỉnh sửa sách thành công', stt: true})
        }
    })
})

//Get by id
router.post('/books/getByIds', function(req, res) {
    const id = req.body.id

    let sql = `SELECT * FROM books WHERE books.id = '${id}'`

    let query = db.query(sql, (err, book) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({book:book[0]})
        }
    })
})

//Add book
router.post('/books/add', function(req, res) {
    const name = req.body.book.name
    const status = req.body.status
    const category = req.body.category
    const author = req.body.author
    const price = req.body.book.price
    const description = req.body.book.description
    const shortDescription = req.body.book.short_description
    const slug = req.body.book.slug
    const image = req.body.image

    let book = { title: name, name: name, slug:slug, image:image, status: status, short_description: shortDescription, description: description, price:price, author_id: author, category_id: category }
    //console.log(users);
    let sql = `INSERT INTO books SET ?`
    let query = db.query(sql, book, (err, book) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Thêm mới sách thành công', stt: true})
        }
    })

})

//Delete book
router.post('/books/delete', function(req,res) {
    const id = req.body.id

    let sql = `DELETE FROM books WHERE books.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Xóa sách thành công', stt: true})
        }
    })
})

//GET all book
router.get('/books/books', function(req, res) {
    //console.log(req)
    $dataPerRow = 5;
    $totalRows = 0;
    $pageNumber = req.query.page;
    $query = req.query.query;
    $status = req.query.status;
    $category = req.query.category;

    $offset = $pageNumber * $dataPerRow;
    
    let sql =   `SELECT * FROM books WHERE 1 = 1 `
    if ($query !== '') {
        sql +=  ` AND books.name LIKE '%${$query}%' `
    }
    if ($status !== '') {
        sql +=  ` AND books.status = ${$status} `
    }

    if  ($category !== '') {
        sql += ` AND books.category_id = ${$category} `
    }
    //console.log(sql)
    //check for query search
    //get total data
    let query = db.query(sql, (err, books) => {
        if (err) {
            throw err;
        } else {
            $totalRows = books.length
            sql += ` ORDER BY created_date DESC LIMIT ${$dataPerRow} OFFSET ${$offset}`

            //console.log(sql)
            let query1 = db.query(sql, (err, books) => {
                if (err) {
                    throw err;
                } else {
                    for (i in books) {
                        books[i].created_date = formatDateTime(books[i].created_date)
                        books[i].updated_date = formatDateTime(books[i].updated_date)
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
                    res.json({books: books, isShow: $isShow, totalRows: $totalRows})
                }
            })

        }
    })
})



module.exports = router