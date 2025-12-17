const express = require('express');
const cors = require('cors');
const userRouter = require('./infrastructure/routers/userRouter');



//  Esta funcion inicializa todas las rutas de la aplicación, luego será utilizada en app.js para correr la aplicación.

const createServer = () => {

    const app = express();

    app.use(express.json());
    app.use(cors())

    app.use('/user', userRouter)
    
    return app;

};

module.exports = createServer;