const RepasModel = require('../../models/RepasModel');

module.exports = async (req, res) => {
    const repas = await RepasModel.find();
    res.json(repas);
}