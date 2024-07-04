const Game = require('../../models/game.model');

module.exports = {
    event: 'game:movePawn',

    handler: (io, socket) => async (data) => {

        if (!data) return;
        io.emit(`game:move:${data.id}`, data);
    },
}