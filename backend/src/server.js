const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const userRouter = require('./infrastructure/routers/userRouter');
const moviesRouter = require('./infrastructure/routers/moviesRouter')



//  Esta funcion inicializa todas las rutas de la aplicación, luego será utilizada en app.js para correr la aplicación.

const createServer = () => {

    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }))
    app.use(cookieParser())

    app.use('/user', userRouter)
    app.use('/movies', moviesRouter)
    
    return app;

};

module.exports = createServer;