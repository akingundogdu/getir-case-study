"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let record = new Schema(
    {
        key: {
            type: String
        },
        createdAt: {
            type: Date
        },
        counts: {
            type: Array
        }
    },
    { collection: "records" }
);

module.exports = mongoose.model("Record", record);