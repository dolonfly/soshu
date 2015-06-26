'use strict';

var _ = require("lodash");
var Book = require("../models/book-model");

function saveBook(book, callback) {
    Book.create(book, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

module.exports = {
    save: saveBook
};