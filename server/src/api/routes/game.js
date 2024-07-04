const { Router } = require('express');
const Game = require('../../models/game.model');

const router = Router();
const route = '/api/game';

router.get('/new', async (req, res) => {
    const game = new Game();
    await game.save();

    res.json({ gameId: game._id });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || id.length !== 24) {
        return res.status(400).json({ message: 'Invalid game ID' });
    }

    await Game.deleteOne({ _id: id });
    res.json({ message: 'Game deleted' });
});


module.exports = { router, route };