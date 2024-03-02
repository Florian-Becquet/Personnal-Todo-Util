const NoteModel = require('../../models/NoteModel');

module.exports = async (req, res) => {
    const { id } = req.params;
    const note = await NoteModel.findById(id);
    await note.deleteOne();
    res.status(204).json(note);
}