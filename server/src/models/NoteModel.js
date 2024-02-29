const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    date: {
        type: Date,
    },
    title: {
        type: String,
    },
    category: {
        type: String,
    }
})

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;

