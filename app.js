const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
  return res.render('index')
})

// 列出全部todo
app.get('/todos', (req, res) => {
  res.send('列出全部todo')
})

// 新增一筆todo頁面 
app.get('/todos/new', (req, res) => {
  res.send('新增todo頁面')
})

// 顯示一筆todo的詳細內容
app.get('/todos/:id', (req, res) => {
  res.send('顯示todo的詳細內容')
})

// 建立一筆todo
app.post('/todos', (req, res) => {
  res.send('建立todo')
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