const Game = require('../../models/game.model');

module.exports = {
    event: 'game:join',

    handler: (io, socket) => async (gameId) => {
        if (!gameId) return;
        if (gameId.length !== 24) return socket.emit(`game:error:${gameId}`, 'Invalid game ID');

        const game = await Game.findById(gameId);
        if (!game) return socket.emit(`game:error:${gameId}`, 'This game does not exist');

        if (game.players.length === 2) return socket.emit(`game:error:${gameId}`, 'This game is full');
        if (game.players.includes(socket.id)) return socket.emit(`game:error:${gameId}`, 'You are already in this game');

        game.players.push(socket.id);
        await game.save();

        if (game.players.length === 2 && game.players[0] !== socket.id) {
            const players = [game.players[0], socket.id];
            const turnIdx = Math.random() < 0.5 ? 0 : 1;
            const turn = players[turnIdx];

            io.emit(`game:update:${gameId}`, {
                _id: game._id,
                players,
                turn
            });

        } else {
            io.emit(`game:update:${gameId}`, game);
        }
    },
}