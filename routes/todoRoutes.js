const express = require('express');

const router = express.Router();
const controller = require('../controllers/todoController');

router.post('/todos', controller.createTodo)
router.put('/todo/:id', controller.updateTodo)
router.delete('/todo/:id', controller.deleteTodo)
router.get('/todo', controller.getAllTodo)

module.exports = router