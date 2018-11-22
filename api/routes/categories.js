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

//Edit category
router.post('/categories/edit', function(req, res) {
    console.log(req.body)
    const status = req.body.status
    const id = req.body.category.id
    const name = req.body.category.name
    const shortDescription = req.body.category.short_description
    const description = req.body.category.description
    const slug = req.body.category.slug

    //console.log(users);
    let sql = `UPDATE categories SET categories.name = '${name}', categories.slug = '${slug}', categories.short_description =  '${shortDescription}', categories.description =  '${description}', categories.status =  '${status}' WHERE categories.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Chỉnh sửa chuyên mục thành công', stt: true})
        }
    })
})

//Get by id
router.post('/categories/getById', function(req, res) {
    const id = req.body.id

    let sql = `SELECT * FROM categories WHERE categories.id = '${id}'`

    let query = db.query(sql, (err, category) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({category:category[0]})
        }
    })
})

//Delete category
router.post('/categories/delete', function(req,res) {
    const id = req.body.id

    let sql = `DELETE FROM categories WHERE categories.id = '${id}'`
    let query = db.query(sql, (err) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Xóa chuyên mục thành công', stt: true})
        }
    })
})
//Add category
router.post('/categories/add', function(req, res) {
    //console.log(req.body)
    const status = req.body.status
    const name = req.body.category.name
    const shortDescription = req.body.category.short_description
    const description = req.body.category.description
    const slug = eq.body.category.slug

    let category = { name: name, status: status, slug: slug, short_description: shortDescription, description: description }
    //console.log(users);
    let sql = `INSERT INTO categories SET ?`
    let query = db.query(sql, category, (err, category) => {
        if (err) {
            //throw err;
            res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
        } else {  
            res.json({msg: 'Thêm mới chuyên chmục thành công', stt: true})
        }
    })
})

//Get book by category slug
router.get('/categories/slug/books', function(req, res) {
    const slug = req.query.slug
    $dataPerRow = 5;
    $totalRows = 0;
    $pageNumber = req.query.page;
    $offset = $pageNumber * $dataPerRow;

    if (slug) {
        let sql = `SELECT id, name FROM categories WHERE slug = '${slug}'`
        let query = db.query(sql, (err, id) => {
            if (err) {
                res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
            } else {
                // console.log(id);
                let cateId = id[0].id
                let sqll = `SELECT * FROM books WHERE books.category_id = '${cateId}' LIMIT ${$dataPerRow} OFFSET ${$offset}`
                let queryl = db.query(sqll, (err, books) => {

                    if (err) {
                        //throw err;
                        res.json({msg: 'Ops! Đã có lỗi xảy ra', stt: false})
                    } else {  
                        $totalRows = books.length
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
                        for (i in books) {
                            books[i].created_date = formatDateTime(books[i].created_date)
                            books[i].updated_date = formatDateTime(books[i].updated_date)
                        }
                        res.json({books: books,id: id, isShow: $isShow, totalRows: $totalRows, stt: true})
                    }
                })
            }
        })
    } else {
        
    }

})

//GET categories 
router.get('/categories/categories', function(req, res) {
    //console.log(req)
    $dataPerRow = 5;
    $totalRows = 0;
    $pageNumber = req.query.page;
    $query = req.query.query;
    $status = req.query.status;
    //console.log($pageNumber);
    $offset = $pageNumber * $dataPerRow;
    
    let sql =   `SELECT * FROM categories WHERE 1 = 1 `
    if ($query !== '') {
        sql +=  ` AND categories.name LIKE '%${$query}%' `
    }
    if ($status !== '') {
        sql +=  ` AND categories.status = ${$status} `
    }
    //console.log(sql)
    //check for query search
    //get total data
    let query = db.query(sql, (err, categories) => {
        if (err) {
            throw err;
        } else {
            $totalRows = categories.length
            sql += ` ORDER BY created_date DESC LIMIT ${$dataPerRow} OFFSET ${$offset}`

            //console.log(sql)
            let query1 = db.query(sql, (err, categories) => {
                if (err) {
                    throw err;
                } else {
                    for (i in categories) {
                        categories[i].created_date = formatDateTime(categories[i].created_date)
                        categories[i].updated_date = formatDateTime(categories[i].updated_date)
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
                    res.json({categories: categories, isShow: $isShow, totalRows: $totalRows})
                }
            })

        }
    })
})

router.get('/categories/categories-search', function(req, res) {
    let sql =   `SELECT id, name FROM categories WHERE 1 = 1 `
    let query = db.query(sql, (err, categories) => {
        if (err) {
            throw err;
        } else {
            res.json({categories: categories})
        }
    })
})

module.exports = router