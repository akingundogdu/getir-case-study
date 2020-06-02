'use strict';

const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
let mongoServer;


module.exports = {
    async connect() {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        await mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
    },

    async disconnect() {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
        await mongoServer.stop();
    }
};
