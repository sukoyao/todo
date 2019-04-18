const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

// 設定路由

// 列出全部todo
router.get('/', (req, res) => {
  res.send('列出全部todo')
})

// 新增一筆todo頁面 
router.get('/new', (req, res) => {
  return res.render('new')
})

// 顯示一筆todo的詳細內容
router.get('/:id', (req, res) => {
  // req.params.id
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('detail', { todo: todo })
  })
})

// 建立一筆todo
router.post('/', (req, res) => {
  const todo = Todo({
    name: req.body.name
  })

  todo.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

// 修改todo頁面
router.get('/:id/edit', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    return res.render('edit', { todo: todo })
  })
})

// 修改todo
router.put('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    todo.name = req.body.name
    if (req.body.done === 'on') {
      todo.done = true
    } else {
      todo.done = false
    }
    todo.save(err => {
      if (err) return console.log(err)
      return res.redirect(`/todos/${req.params.id}`)
    })
  })
})

// 刪除todo
router.delete('/:id/delete', (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.log(err)
    todo.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})

module.exports = router