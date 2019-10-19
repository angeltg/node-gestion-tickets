// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

//Comprobamos la conexión con el servidor
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

//Escuchamos al server
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

$('button').on('click', function() {
    console.log('Click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

});

socket.on('actualTicket', function(resp) {
    label.text(resp.actual);
});