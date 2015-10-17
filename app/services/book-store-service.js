"use strict"

var request = require("request");
var iconv = require('iconv-lite');
var JSON5 = require('json5');

function requestBook(isbn, mixed, callback) {
    var options = {
        url: 'https://api.douban.com/v2/book/isbn/' + isbn + '?apikey=0e535a0a41c908b72afa0e1ec55b1a25',
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };
    request(options, function (err, res) {
        if (err) {
            callback(err);
        }
        var jsonStr = iconv.decode(res.body, "utf-8");
        var json5 = JSON5.parse(jsonStr);
        callback(null, {
            _id: json5.id,
            isbn: json5.isbn13,
            title: json5.title,
            publisher: json5.publisher,
            image: json5.image,
            pubdate: json5.pubdate,
            sid: mixed
        });

    });
}

module.exports = {
    requestBookSimpleInfo: requestBook
};

