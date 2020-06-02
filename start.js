"use strict";


const app = require('./server');
const mongoDB = require('./src/database/Mongo');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server listening at port ${PORT}`));
mongoDB.connect();