const { io } = require('../server');

io.on('connection', (client) => {

    console.log('Usuario conectado');

    // Responder al Cliente
    client.emit('enviarMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido a esta aplicacion'
    });


    client.on('disconnect', () => {
        console.log('El usuario se ha desconectado');
    });


    // Escuhar el cliente
    client.on('enviarMensaje', (mensaje, callback) => {
        
        console.log(mensaje);

        // El servidor responde a todos los clientes sin incluir el emisor
        //client.broadcast.emit('enviarMensaje', mensaje);

        if(mensaje.usuario)
        {
            callback({
                ok: true,
                msg: `El usuario es: ${mensaje.usuario}`
            });
        }
        else
        {
            callback({
                ok: false,
                msg: `El usuario es obligatorio`
            });
        }
    });
});