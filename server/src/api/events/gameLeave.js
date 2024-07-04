const Game = require('../../models/game.model');

module.exports = {
    event: 'disconnect',

    handler: (io, socket) => async () => {

        try {
            
            const game = await Game.findOne({ players: { $in: [socket.id] } });
            if (!game) return;
    
            if (game.players.length === 1) {
                await Game.deleteOne({ _id: game._id });
                return;
            }
    
            game.players = game.players.filter(player => player !== socket.id);
            await game.save();
    
            io.emit(`game:update:${game._id}`, game);
            
        } catch (error) {
            console.error(error);
        }
    },
}