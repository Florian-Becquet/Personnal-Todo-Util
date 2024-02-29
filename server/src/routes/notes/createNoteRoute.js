const NoteModel = require('../../models/NoteModel');

module.exports = async (req, res) => {
    const {text} = req.body;
    const {date} = req.body;
    const {title} = req.body;
    const {category} = req.body;
    
    const note = new NoteModel({
        text,
        date,
        title,
        category,
    })
    const newNote = await note.save();
    res.json(newNote);
}