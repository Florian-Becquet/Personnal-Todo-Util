const TodoModel = require('../../models/TodoModel');

module.exports = async (req, res) => {
    const {text} = req.body;
    const {date} = req.body;
    const {category} = req.body;
    const {currentDate} = req.body;
    const todo = new TodoModel({
        text,
        date,
        completed:false,
        category,
        currentDate,
    })
    const newTodo = await todo.save();
    res.json(newTodo);
}