const mongoose = require('mongoose');

const RepasSchema = new mongoose.Schema({
    lundiMidi: {
        type: String,
    },
    lundiSoir: {
        type: String,
    },
    mardiMidi: {
        type: String,
    },
    mardiSoir: {
        type: String,
    },
    mercrediMidi: {
        type: String,
    },
    mercrediSoir: {
        type: String,
    },
    jeudiMidi: {
        type: String,
    },
    jeudiSoir: {
        type: String,
    },
    vendrediMidi: {
        type: String,
    },
    vendrediSoir: {
        type: String,
    },
    samediMidi: {
        type: String,
    },
    samediSoir: {
        type: String,
    },
    dimancheMidi: {
        type: String,
    },
    dimancheSoir: {
        type: String,
    },
    
})

const RepasModel = mongoose.model('Repas', RepasSchema);

module.exports = RepasModel;