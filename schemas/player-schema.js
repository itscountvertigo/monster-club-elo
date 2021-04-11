const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    playerID: {
        type: String,
        required: true
    },
    trialRating: {
        type: Number,
        required: true
    },
    royaleRating: {
        type: Number,
        required: true
    },
    mazeRating: {
        type: Number,
        required: true
    },
    trialGP: {
        type: Number,
        required: true
    },
    royaleGP: {
        type: Number,
        required: true
    },
    mazeGP: {
        type: Number,
        required: true
    },
    
    
})

module.exports = mongoose.model('players', playerSchema)