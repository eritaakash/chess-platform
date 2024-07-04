const handleRoutesConnection = require('./utils/route.handler.js');
const handleSocketConnection = require('./utils/event.handler.js');
const connectToDatabase = require('./utils/db.handler.js');
const { Server } = require('socket.io');
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');


dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the ChessAPI!');
});

handleRoutesConnection(app);
handleSocketConnection(io);

connectToDatabase().then(() => {
    server.listen(PORT, () => console.log(`[!]; Server is running on PORT ${PORT}`));
});