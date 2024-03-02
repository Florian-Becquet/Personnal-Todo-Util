const NoteModel = require('../../models/NoteModel');

module.exports = async (req, res) => {
    const {id} = req.params;
    const note = await NoteModel.findById(id);
    note.title = req.body.title;
    note.text = req.body.text;
    note.date = req.body.date;
    note.category = req.body.category;
    await note.save();
    res.json(note);
}