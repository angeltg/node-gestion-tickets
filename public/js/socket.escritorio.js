// Comando para establecer la conexión
var socket = io();

//lemos los parámetros que vienen en la url
var searchParams = new URLSearchParams(window.location.search);

//Si no existe el escritorio
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp === "No hay más tickets") {
            label.text(resp);
            return
        }
        label.text(resp.numero);

    });



});