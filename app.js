const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定methodOverride
app.use(methodOverride('_method'))

mongoose.connect('mongodb://127.0.0.1/todo', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 todo model
const Todo = require('./models/todo')

// 載入路由
app.use('/todos', require('./routes/todo'))
app.use('/', require('./routes/home'))

app.listen(3000, () => {
  console.log('App is running!!!!!')
})