const mongoose = require("mongoose");

class MongoConnection {

    static instance = null;


    constructor(uri, dbName) {

        if (MongoConnection.instance) return MongoConnection.instance;

        this.uri = uri;
        this.dbName = dbName;
        this.isConnected = false;

        MongoConnection.instance = this;

    }

    
    async connect() {

        if (this.isConnected) return mongoose.connection;

        await mongoose.connect(this.uri, { dbName: this.dbName });
        this.isConnected = true;
        console.log("MongoDB conectado");

        return mongoose.connection;

    }
}

module.exports = MongoConnection;