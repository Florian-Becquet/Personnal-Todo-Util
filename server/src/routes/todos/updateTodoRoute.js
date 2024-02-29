const TodoModel = require('../../models/TodoModel');

module.exports = async (req, res) => {
    const {id} = req.params;
    const todo = await TodoModel.findById(id);
    todo.completed = req.body.completed;
    todo.text = req.body.text;
    todo.date = req.body.date;
    todo.category = req.body.category;
    todo.currentDate = req.body.currentDate;
    await todo.save();
    res.json(todo);
}