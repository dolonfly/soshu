var topBooksService = require('../services/dangdang');
var bookService = require('../services/book-service');
var async = require('async');


function fetchAndSave() {
    var pageNum = 1;
    async.whilst(
        function () {
            return pageNum <= 25;
        },
        function (callback) {
            saveOnePage(pageNum);
            console.log("page " + pageNum + " done");
            pageNum++;
        },
        function (err) {

        }
    );
}

function saveOnePage(page) {
    topBooksService.generateTopBooks(page, function (err, result) {
        if (err) {
            return;
        }
        for (var i in result) {
            var simpleBookItem = result[i];
            var bookId = simpleBookItem.bookId;
            var orderId = simpleBookItem.orderId;
            topBooksService.generateBookIsbn(bookId, function (err, result) {
                if (err) {
                    return;
                }
                var book = result;
                book.orderId = orderId;
                bookService.save(book, function (err, result) {
                });
            })
        }

    });
}

fetchAndSave();