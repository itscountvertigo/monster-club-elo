const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    playerID: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('players', playerSchema)