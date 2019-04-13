const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

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
  // req.params.id
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('detail', { todo: todo })
  })
})

// 建立一筆todo
app.post('/todos', (req, res) => {
  const todo = Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

// 修改todo頁面
app.get('/todos/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('edit', { todo: todo })
  })
})

// 修改todo
app.post('/todos/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    todo.name = req.body.name
    todo.save(err => {
      if (err) return console.log(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})

// 刪除todo
app.post('/todos/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    todo.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

app.listen(3000, () => {
  console.log('App is running!!!!!')
})