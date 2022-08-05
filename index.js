const express = require('express');
const App = express();
const PORT = 4000;
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

// Configure socket
const httpServer = http.createServer(App);
const io = socketIO(httpServer);

App.use(cors());
App.use(express.json());

App.get('/', (req, res) => {
    res.status(200).send('<h1>Socket API</h1>')
});

let dataChat = []; // menyimpan data chat sementara

// Configure connection socket from client
io.on('connection', (socket) => {
    socket.on('JoinSocket', (data) => {
        console.log("User join data :", data);
        io.emit('joinNotif', `${data.username} Success Join Socket ✅`)
    })

    socket.on('chat', (data) => {
        dataChat.push(data);
        io.emit('chatForward', dataChat);
    })
});

httpServer.listen(PORT, () => console.log(`Socket server : ${PORT}`));