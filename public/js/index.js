let socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'jake',
    text: 'Some text'
  });
});

socket.on('disconnect', function () {
  console.log('Dicsonnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});
