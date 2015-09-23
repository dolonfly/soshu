"use strict";

var mongoose = require('mongoose');

module.exports = {
    init: function (dbConfig) {
        mongoose.connect(dbConfig.uri, dbConfig.options);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
    }
};