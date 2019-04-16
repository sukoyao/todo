const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

// Todo 首頁
router.get('/', (req, res) => {
  Todo.find()
    .sort({ name: 'asc' })
    .exec((err, todos) => {
      return res.render('index', { todos: todos })
    })
})

module.exports = router