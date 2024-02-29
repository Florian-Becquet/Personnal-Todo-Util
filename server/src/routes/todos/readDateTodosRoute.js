const TodoModel = require('../../models/TodoModel');

module.exports = async (req, res) => {
    const todoDate = await TodoModel.find({ date: req.params.date });
    res.json(todoDate);
}