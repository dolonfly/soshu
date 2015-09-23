"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    bookId: String,
    source: String,
    name: String,
    url: String,
    pic: String,
    pics: [String],
    orderId: Number,
    isbn10: String,
    isbn13: String,
    author: String,
    authorIntro: String,
    publisher: String,
    publishTime: String,
    category: String,
    subTitle: String,
    salePriceTag: String,
    originalPriceTag: String,
    abstract: String,
    content: String,
    catalog: String,
    preface: String

}, {
    collection: 'books'
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;