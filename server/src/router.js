const express = require('express');
const router = express.Router();

const createTodoRoute = require('./routes/todos/createTodoRoute');
const readTodosRoute = require('./routes/todos/readTodosRoute');
const updateTodoRoute = require('./routes/todos/updateTodoRoute');
const deleteTodoRoute = require('./routes/todos/deleteTodoRoute');
const readDateTodosRoute = require('./routes/todos/readDateTodosRoute');

const readNotesRoute = require('./routes/notes/readNotesRoute')
const createNoteRoute = require('./routes/notes/createNoteRoute');
const deleteNoteRoute = require('./routes/notes/deleteNoteRoute');
const updateNoteRoute = require('./routes/notes/updateNoteRoute');


const updateRepasRoute = require('./routes/repas/updateRepasRoute');
const createRepasRoute = require('./routes/repas/createRepasRoute');
const readRepasRoute = require('./routes/repas/readRepasRoute');




router.post('/todos', createTodoRoute);
router.get('/todos', readTodosRoute);
router.get('/todos/:date',  readDateTodosRoute);
router.put('/todos/:id',  updateTodoRoute);
router.delete('/todos/:id',  deleteTodoRoute);

router.get('/notes',  readNotesRoute);
router.post('/notes', createNoteRoute);
router.delete('/notes/:id', deleteNoteRoute);
router.put('/notes/:id', updateNoteRoute)

router.post('/annexes/repas', createRepasRoute);
router.get('/annexes/repas', readRepasRoute);
router.put('/annexes/repas/:id', updateRepasRoute);


module.exports = router;