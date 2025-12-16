const MongoConnection = require('./domain/db');
const createServer = require('./server');


const startApp = async () => {

    //  Conectamos a la db y levantamos las rutas
    const mongo = new MongoConnection(process.env.MONGO_URI, process.env.MONGO_DB);
    await mongo.connect();
    const app = createServer();


    //Levantamos el aplicativo con .listen()

    app.listen({port: process.env.EXPRESS_PORT, host:process.env.EXPRESS_HOST}, () => {
        console.log(`http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`);
    });

};


startApp();