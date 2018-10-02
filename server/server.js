const path     = require('path');
const http     = require('http');
const express  = require('express');
const sockerIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
let io = sockerIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'Hey there',
    createdAt: 123
  });

  socket.on('createEmail', (newEmail) => {
    console.log(newEmail);
  });

  socket.emit('newMessage', {
    from: 'Ron',
    text: 'Hello chat',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log(message);
  });

  socket.on('disconnect', () => {
    console.log('Client was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
