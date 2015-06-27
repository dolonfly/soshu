'use strict';

var Book = require("../models/book-model");
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/soshu-local');
function saveBook(book, callback) {
    Book.create(book, function (err, result) {
        console.log("save done");
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

function findTop(source, offset, num, callback) {
    var query = Book.find({});
    query.where('source', source);
    query.limit(num);
    query.skip(offset);
    query.exec(function (err, docs) {
        callback(err,docs);
    });
}

module.exports = {
    save: saveBook,
    listTopBooks: findTop
};


findTop('dd', 0, 10, function (err) {

});