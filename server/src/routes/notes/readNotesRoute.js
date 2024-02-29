const NoteModel = require('../../models/NoteModel');

module.exports = async (req, res) => {
    const notes = await NoteModel.find();
    res.json(notes);
}