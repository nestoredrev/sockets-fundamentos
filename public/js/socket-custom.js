const socket = io();



socket.on('connect', function(){
    console.log('Conectado al servidor');
});



// on son Listener
socket.on('disconnect', function(){
    console.log('Perdimos conexion con el servidor');
});



// Enviar informacion al servidor
socket.emit('enviarMensaje', {
    usuario: 'Nestor',
    mensaje: 'hola amigo'
}, function (respuesta){ 
    console.log('Respuesta server', respuesta);
})



// Recibir/Escuchar informacion desde el servidor
socket.on('enviarMensaje', function(data) {
    console.log('Servidor: ',data);
})