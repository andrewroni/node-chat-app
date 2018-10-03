let socket = io();

socket.on('connect', function () {
  console.log('connected to server');

});

socket.on('disconnect', function () {
  console.log('Dicsonnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${formattedTime} ${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi!'
}, (data) => console.log('Got It', data));

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${formattedTime} ${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not suppoerted by tour browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location..');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled');
    alert('Unable to fertch location.');
  });
}
);
