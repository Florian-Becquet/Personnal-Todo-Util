const RepasModel = require('../../models/RepasModel');

module.exports = async (req, res) => {
    console.log(req.body);
    const {lundiMidi} = req.body;
    const {lundiSoir} = req.body;
    const {mardiMidi} = req.body;
    const {mardiSoir} = req.body;
    const {mercrediMidi} = req.body;
    const {mercrediSoir} = req.body;
    const {jeudiMidi} = req.body;
    const {jeudiSoir} = req.body;
    const {vendrediMidi} = req.body;
    const {vendrediSoir} = req.body;
    const {samediMidi} = req.body;
    const {samediSoir} = req.body;
    const {dimancheMidi} = req.body;
    const {dimancheSoir} = req.body;
    
    const repas = new RepasModel({
        lundiMidi,
        lundiSoir,
        mardiMidi,
        mardiSoir,
        mercrediMidi,
        mercrediSoir,
        jeudiMidi,
        jeudiSoir,
        vendrediMidi,
        vendrediSoir,
        samediMidi,
        samediSoir,
        dimancheMidi,
        dimancheSoir
    })
    const newRepas = await repas.save();
    res.json(newRepas);
}