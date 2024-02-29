const express = require('express');
const router = express.Router();

const createTodoRoute = require('./routes/todos/createTodoRoute');
const readTodosRoute = require('./routes/todos/readTodosRoute');
const updateTodoRoute = require('./routes/todos/updateTodoRoute');
const deleteTodoRoute = require('./routes/todos/deleteTodoRoute');
const readDateTodosRoute = require('./routes/todos/readDateTodosRoute');

const readNotesRoute = require('./routes/notes/readNotesRoute')
const createNoteRoute = require('./routes/notes/createNoteRoute');


router.post('/todos', createTodoRoute);
router.get('/todos', readTodosRoute);
router.get('/todos/:date',  readDateTodosRoute);
router.put('/todos/:id',  updateTodoRoute);
router.delete('/todos/:id',  deleteTodoRoute);

router.get('/notes',  readNotesRoute);
router.post('/notes', createNoteRoute);


module.exports = router;