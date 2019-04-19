const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const { authenticated } = require('../config/auth')
// Todo 首頁
router.get('/', authenticated, (req, res) => {
  Todo.find()
    .sort({ name: 'asc' })
    .exec((err, todos) => {
      return res.render('index', { todos: todos })
    })
})

module.exports = router