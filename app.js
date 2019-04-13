const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extened: true }))

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

// 設定路由
// Todo 首頁
app.get('/', (req, res) => {
  Todo.find((err, todos) => {
    return res.render('index', { todos: todos })
  })
})

// 列出全部todo
app.get('/todos', (req, res) => {
  res.send('列出全部todo')
})

// 新增一筆todo頁面 
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 顯示一筆todo的詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示todo的詳細內容')
})

// 建立一筆todo
app.post('/todos', (req, res) => {
  const todo = Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) return connsole.log(err)
    return res.redirect('/')
  })
})

// 修改todo頁面
app.get('/todos/:id/edit', (req, res) => {
  res.send('修改todo頁面')
})

// 修改todo
app.post('/todos/:id', (req, res) => {
  res.send('修改todo')
})

// 刪除todo
app.post('/todos/:id/delete', (req, res) => {
  res.send('刪除todo')
})

app.listen(3000, () => {
  console.log('App is running!!!!!')
})