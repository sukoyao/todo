const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')

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

// secret: 定義一組自己的私鑰（字串)
app.use(session({
  secret: 'is my secret',
}))

// 使用passport
app.use(passport.initialize())
app.use(passport.session())

// 載入passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// 載入 todo model
const Todo = require('./models/todo')

// 載入路由
app.use('/todos', require('./routes/todo'))
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))

app.listen(3000, () => {
  console.log('App is running!!!!!')
})