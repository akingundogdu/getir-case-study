const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_CONNECTION_STRING,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

const connection = mongoose.connection;

exports.connect = function () {
    connection.once("open", function () {
        console.log("MongoDB database connection established successfully");
    });
}
