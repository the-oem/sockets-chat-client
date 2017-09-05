var socket = io();
var thisClient;
var timeout;

$( document ).ready(function() {
  thisClient = getUsername() || generateUsername();
  $('.username-input').val(thisClient);
  socket.id = thisClient;
});

$('form').submit(function() {
  socket.emit('chat message', thisClient + ': ' + $('#m').val());
  $('#messages').prepend($('<li>').text(thisClient + ': ' + $('#m').val()));
  $('#m').val('');
  return false;
});

$('.username-btn').on('click', () => {
  setUsername($('.username-input').val())
})

const timeoutFunction = () => {
  socket.emit("typing", false);
}

$('#m').keyup(function() {
    socket.emit('typing', `${thisClient} is typing...`);
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 1000);
});

socket.on('broadcast', function(msg) {
  $('#messages').append($('<li>').text(msg));
});

socket.on('typing', function(data) {
  data ? $('.typing').html(data) : $('.typing').html("");
});

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(msg));
});

const setUsername = (username) => {
  localStorage.setItem('smacktalkUsername', username);
  thisClient = username;
}

const getUsername = () => {
  return localStorage.getItem('smacktalkUsername');
}

const generateUsername = () => {
  return Math.floor(Math.random() * 89999 + 10000)
}
