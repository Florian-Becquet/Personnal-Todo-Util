const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
    date: {
        type: Date,
    },
    category: {
        type: String,
    },
    currentDate: {
        type: Date,
    }
})


const TodoModel = mongoose.model('Todo', TodoSchema);


module.exports = TodoModel;