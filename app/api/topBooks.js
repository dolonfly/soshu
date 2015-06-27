/**
 * Created by dll on 15/6/23.
 */
var topBooksService = require('../services/dangdang');
var searchTopBooksService = require('../services/book-service');

function searchTopBooks(req, res, next) {
    var source = req.param('source');
    var page = req.param('page');
    if (source == null) {
        source = 'dd';
    }
    if (page==null||page < 0 || page > 25) {
        page = 0;
    }
    var offset = page * 20;
    console.log('source:' + source + ",page:" + page + ",offset:" + offset);
    searchTopBooksService.listTopBooks(source, offset, 20, function (err, resout) {
        res.write(resout.toString());
    });

}


function searchFullBookDetail(req, res, next) {
    var bookId = req.param('bookId');
    topBooksService.generateBookIsbn(bookId, function (err, resource) {
        res.write(JSON.stringify(resource));
    });
}

module.exports = {
    searchFullBookDetail: searchFullBookDetail,
    listTopBooks: searchTopBooks
};