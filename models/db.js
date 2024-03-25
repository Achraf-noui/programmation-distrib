const config = require("../config");
const mongoose = require("mongoose");

const url = config.mongoURI.local

const options = {};

mongoose.connect(url, options);

mongoose.connection.on("connecting", () => { console.log("connecting"); });

mongoose.connection.on("error", console.error.bind(console, 'MongoDB connection error:'));

mongoose.connection.on("disconnected", () => { console.log("disconnected"); });

mongoose.connection.on("reconnecting", () => { console.log("reconnecting"); });

mongoose.connection.on("connected", () => { console.log("connection successfully established"); });

module.exports = mongoose.connection;