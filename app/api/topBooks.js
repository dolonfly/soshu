/**
 * Created by dll on 15/6/23.
 */
var topBooksService = require('../services/dangdang');

function searchTopBooks(req, res, next) {
    var page = req.param('page');
    if (page == null || page < 0 || page > 25) {
        page = 0;
    }
    topBooksService.generateTopBooks(page, function (err, resource) {
        res.write(JSON.stringify(resource));

    });
}

function searchFullBookDetail(req, res, next) {
    var bookId = req.param('bookId');
    topBooksService.generateBookIsbn(bookId, function (err, resource) {
        res.write(JSON.stringify(resource));
    });
}

module.exports = {
    searchTopBooks: searchTopBooks,
    searchFullBookDetail: searchFullBookDetail
};