const { Router } = require('express')
const csrf = require('csurf')
const fs = require("fs")

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
    const count = req.body.book.count
    const id = req.body.id
    const status = req.body.status
    const category = req.body.category
    const author = req.body.author
    const price = req.body.book.price
    const description = req.body.book.description
    const shortDescription = req.body.book.short_description
    const slug = req.body.book.slug
    const image = req.body.image
    let  patht = ''
    if (image.includes("data:image")) {
        var base64Data = image.replace(/^data:image\/png;base64,/, "");
        const pathImage = 'static/images/' + slug + '.png'
        let path = '/images/' + slug + '.png'
        patht = path
        fs.writeFile(pathImage, base64Data, 'base64', function(err) {
            //if (err)
        });
    } else {
        let path = image
        patht = path
    }

    

    let sql = `UPDATE books SET books.name = '${name}', books.image = '${patht}', books.count = '${count}', books.slug = '${slug}', books.price = '${price}',books.description = '${description}',books.short_description = '${shortDescription}', books.status =  '${status}', books.category_id =  '${category}', books.author_id =  '${author}' WHERE books.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            console.log(err)
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
    const count = req.body.book.count
    const status = req.body.status
    const category = req.body.category
    const author = req.body.author
    const price = req.body.book.price
    const description = req.body.book.description
    const shortDescription = req.body.book.short_description
    const slug = req.body.book.slug
    const image = req.body.image

    var base64Data = image.replace(/^data:image\/png;base64,/, "");
    const pathImage = 'static/images/' + slug + '.png'
    const path = '/images/' + slug + '.png'

    fs.writeFile(pathImage, base64Data, 'base64', function(err) {
        //if (err)
    });

    let book = { title: name, name: name, count: count, slug:slug, image:path, status: status, short_description: shortDescription, description: description, price:price, author_id: author, category_id: category }
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

//Store book into session
router.post('/books/storeBook', function(req, res) {
    const bookCart = req.body.bookCart
    req.session.bookCart = bookCart
    
})

//Borrow Book
router.post('/books/borrowbook', function(req, res) {
    const json = req.body.bookBorrow
    const toDate = req.body.toDate
    const note = req.body.note
    const email = req.body.email
    const bookId = json.id
    //console.log(json);
    
    //Find user id by email
    let sql = `SELECT id FROM users  WHERE users.email = '${email}'`

    let query = db.query(sql, (err, user) => {
        if (err) {
            throw err;
            console.log(err);
        }

        if (!user[0]) {
            res.json({msg: 'Tài khoản không tồn tại', stt: false});
        } else {
            //check xem so luong muon voi so luong sach
            if (json.borrowed < json.count) {
                let userId = user[0].id
            
                let dataBorrow = {id_user: userId, book_id: bookId, note: note, json: JSON.stringify(json), to_date: toDate}
                let sqll = `INSERT INTO borrow_books SET ?`
                let queryl = db.query(sqll, dataBorrow, (err, bookBorrow) => {
                    if (err) {
                        //throw err;
                        res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
                    } else {
                        //console.log(json.count)
                        let add = json.borrowed + 1
                        // cong them 1 vao cot borrow trong bang sach
                        let sqlll = `UPDATE books SET books.borrowed = '${add}' WHERE books.id = '${bookId}'`
                        let queryll = db.query(sqlll, (err) => {
                            if (err) {
                                //throw err;
                                console.log(err)
                                res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
                            } else {  
                                res.json({msg: 'Mượn sách thành công', stt: true}) 
                            }
                        })
                        
                    }
                })
            } else {
                res.json({msg: 'Oops! Số lượng sách tạm thời đã hết', stt: false})
            }
            
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
    
    let sql =   `SELECT id, name, count,borrowed, image, slug, short_description, description, price, status, category_id, author_id, created_date, updated_date FROM books WHERE 1 = 1 `
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


//Get borrow book
router.get('/books/borrowbookss', function(req, res) {
    console.log(req)
    $dataPerRow = 5;
    $totalRows = 0;
    $pageNumber = req.query.page;
    $query = req.query.query;
    $status = req.query.status;
    $createdDateOne = req.query.createdDate;
    $removedDateOne = req.query.removedDate;

    $offset = $pageNumber * $dataPerRow;
    
    let sql =   `SELECT borrow_books.*, users.id as userId, users.name as userName FROM borrow_books INNER JOIN users ON users.id = borrow_books.id_user  WHERE 1 = 1 `
    if ($query !== '') {
        //sql +=  ` AND borrow_books.name LIKE '%${$query}%' `
    }
    if ($status !== '') {
        sql +=  ` AND borrow_books.status = ${$status} `
    }
    //from created date
    if ($createdDateOne !== '') {
        $fromCreatedDate =  moment($createdDateOne.toISOString().replace(/T/, ' ').replace(/\..+/, '')).format('DD/MM/YYYY 00:00:00')
        sql +=  ` AND borrow_books.from_date >= ${$fromCreatedDate} `
    }

    //from return date
    if($removedDateOne !== '') {
        $fromCreatedDate =  moment($removedDateOne.toISOString().replace(/T/, ' ').replace(/\..+/, '')).format('DD/MM/YYYY 23:59:59')
        sql +=  ` AND borrow_books.real_date >= ${$fromCreatedDate} ` 
    }
    //console.log(sql);

    let query = db.query(sql, (err, borrow_books) => {
        if (err) {
            throw err;
        } else {
            $totalRows = borrow_books.length
            sql += ` ORDER BY created_date DESC LIMIT ${$dataPerRow} OFFSET ${$offset}`

            //console.log(sql)
            let query1 = db.query(sql, (err, borrow_books) => {
                if (err) {
                    throw err;
                } else {
                    for (i in borrow_books) {
                        borrow_books[i].created_date = formatDateTime(borrow_books[i].created_date)
                        borrow_books[i].updated_date = formatDateTime(borrow_books[i].updated_date)
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
                    res.json({borrow_books: borrow_books, isShow: $isShow, totalRows: $totalRows})
                }
            })

        }
    })
})

//Book borrow user
router.get('/books/borrowbooks-bu-user', function(req, res) {
    console.log(req.query)
    $totalRows = 0;
    id = req.query.userId;

    
    let sql =   `SELECT borrow_books.*, users.id as userId, users.name as userName FROM borrow_books INNER JOIN users ON users.id = borrow_books.id_user  WHERE 1 = 1 and borrow_books.id_user = '${id}'`

    let query = db.query(sql, (err, borrow_books) => {
        if (err) {
            throw err;
        } else {
            $totalRows = borrow_books.length

            //console.log(sql)
               
            for (i in borrow_books) {
                borrow_books[i].created_date = formatDateTime(borrow_books[i].created_date)
                borrow_books[i].updated_date = formatDateTime(borrow_books[i].updated_date)
            }
            res.json({borrow_books: borrow_books, totalRows: $totalRows})
        }
    })
})



module.exports = router