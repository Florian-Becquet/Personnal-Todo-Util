const RepasModel = require('../../models/RepasModel');

module.exports = async (req, res) => {
    const { id } = req.params;
    const repas = await RepasModel.findById(id);
    repas.lundiMidi = req.body.lundiMidi;
    repas.lundiSoir = req.body.lundiSoir;
    repas.mardiMidi = req.body.mardiMidi;
    repas.mardiSoir = req.body.mardiSoir;
    repas.mercrediMidi = req.body.mercrediMidi;
    repas.mercrediSoir = req.body.mercrediSoir;
    repas.jeudiMidi = req.body.jeudiMidi;
    repas.jeudiSoir = req.body.jeudiSoir;
    repas.vendrediMidi = req.body.vendrediMidi;
    repas.vendrediSoir = req.body.vendrediSoir;
    repas.samediMidi = req.body.samediMidi;
    repas.samediSoir = req.body.samediSoir;
    repas.dimancheMidi = req.body.dimancheMidi;
    repas.dimancheSoir = req.body.dimancheSoir
    await repas.save();
    res.json(repas);
}