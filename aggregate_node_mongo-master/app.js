const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const body_parser = require('body-parser')
//stape1 file upload
const multer = require('multer')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secrect',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false
}))

app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))

//stape2 fileupload
app.use('/upload', express.static(path.join(__dirname, 'upload')));

//stape3
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
//stape4 file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("png") ||
        file.mimetype.includes("jpg") ||
        file.mimetype.includes("jpeg")) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
//stape5 file upload
app.use(multer({ storage: fileStorage, fileFilter: fileFilter, limits: { fieldSize: 1024 * 1024 * 5 } }).single('image'))



app.set('view engine', 'ejs')
app.set('viwes', 'views')

const ProductRoute = require('./route/product')
//const { json } = require('body-parser')
const ApiRoute = require('./route/Api_route')
app.use(ProductRoute)
app.use('/api', ApiRoute)

const inventoryRoute = require('./route/LookupRoute');
app.use(inventoryRoute)

const EmployeeRoute = require('./route/Groupby')
app.use('/api', EmployeeRoute)
const dbDriver = "mongodb+srv://ankandb:vnkhSzkCKB5LXe20@cluster0.jmt30c3.mongodb.net/aggr"
const port = process.env.PORT || 7000
mongoose.connect(dbDriver, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port, () => {
            console.log(`server running http://localhost:${port}`)
        })
    }).catch(err => {
        console.log(err)
    })

