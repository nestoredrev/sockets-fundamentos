const config     = require('./config/config');
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const path       = require('path');
const socketIO   = require('socket.io');
const http       = require('http');

const app        = express();

// socket.io utiliza el http de nodejs
const server = http.createServer(app);

//app.use es para asignar los middleware, es decir todas las peticiones que se realizan se ejecutaran los middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


// Habilitar la carpeta public
app.use( express.static( path.resolve(__dirname, '../public') ) );



// Para ver la configuracion correcta: http://localhost:3000/socket.io/socket.io.js
module.exports.io = socketIO(server);

// Utilizar el archivo socketjs en el server
// Configuracion de socket.io en el Back-End
require('./sockets/socket');


mongoose.connect(config.db,
                { 
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    autoIndex: true,
                    useFindAndModify: false
                }, 
                (err, res) => {
    if(err) throw `Ha ocorrido un error a la conexion de la BBDD ---> ${err}`;
    else console.log(`Base de datos ${res.name} online`);
});
 
server.listen(config.port, () => {
    console.log(`Escuchando en el puerto ${config.port}`);
});