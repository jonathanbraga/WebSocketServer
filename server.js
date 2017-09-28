var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var led = {state:false};
var msg = "";

app.get('192.168.0.13', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  console.log('User connected: ' + socket.id);
  socket.emit('led', led);
  socket.emit('send',msg);

  socket.on('send', function(msg) {
    if(msg == 1){
        led.state = true
        console.log('id: ' + msg + ' led: ' + led.state);
        io.sockets.emit('led', led);    
    }
    else if(msg == 0){
        led.state = false;
        console.log('id: ' + msg + ' led: ' + led.state);
        io.sockets.emit('led', led);
    }
  });

  socket.on('disconnect', function(){
    console.log('User disconnected: ' + socket.id);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});