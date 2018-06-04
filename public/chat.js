//Make connection 
var socket = io.connect('http://localhost:4000');  // running on front end
//io is run in the library of front end

// Query DOM // when click each of them in html, it will be..
var message = document.getElementById('message');
    handle = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');


//emit events to server
btn.addEventListener('click', function(){
    //console.log(message)
    socket.emit('chat', {
        message: message.value, 
        handle: handle.value,  
    });
    message.value="";
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value); // send the data of the person typing of the handle. sending the value showing to server
})
// after sent data to all clients.
      //listen the events on the front end
socket.on('chat', function(data){
    feedback.innerHTML ="";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + "is typing a message.. </em></p>"
     // from the value of feedback and innnerHTML it 
})

