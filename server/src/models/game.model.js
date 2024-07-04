const { Schema, model } = require('mongoose');

const game = new Schema({
    players: {
        type: Array,
        required: true
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    },

    expireAt: {
        type: Date,
        index: { 
            expiresIn: 10 
        },
  },
});

module.exports = model('Game', game);