const path = require('path');
const fs = require('fs');

const handleSocketEvents = (io, socket) => {
    
    const eventsPath = path.join(__dirname, '../api/events');
    const eventsDir = fs.readdirSync(eventsPath);

    for (const file of eventsDir) {
        const { event, handler } = require(path.join(eventsPath, file));
        socket.on(event, handler(io, socket));
    }
};

const handleSocketConnection = (io) => io.on('connection', (socket) => {
    handleSocketEvents(io, socket);
});

module.exports = handleSocketConnection;