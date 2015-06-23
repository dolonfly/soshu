/**
 * book.dangdang.com 处理api
 * Created by dll on 15/6/22.
 */

var request = require("request");
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var debug = require('debug')('api:dangdang');

function generateTopBooks(pageNum, callack) {
    var options = {
        url: 'http://bang.dangdang.com/books/bestsellers/01.00.00.00.00.00-24hours-0-0-1-1',
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };
    request(options, function (err, res) {
        if (err) return callack;

        var html = iconv.decode(res.body, "GB2312");


        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(html);

        //读取图书列表
        var simpleBookInfo = [];
        $('ul[class="bang_list clearfix bang_list_mode"] li').each(function () {
            var $me = $(this);
            var url1 = $me.find('.name a').attr('href');
            var item = {
                name: $me.find('.name a').attr('title'),
                url: $me.find('.name a').attr('href'),
                pic: $me.find('.pic img').attr('src'),
                id: url1.substr(url1.lastIndexOf('/') + 1).replace('.html', ''),
                star: $me.find('.star .tuijian').text(),


            };
            simpleBookInfo.push(item);
            console.log(item);

        });
        callack(null,simpleBookInfo);
    });
};

//通过图书id获取图书的信息。
function generateBookIsbn(bookId, callback) {
    var options = {
        url: 'http://product.dangdang.com/' + bookId + '.html',
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };
    request(options, function (err, res) {
        if (err) return callack;

        var html = iconv.decode(res.body, "GB2312");

        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(html);

        var author, publishTime, publisher, category;

        $('.book_messbox  .clearfix').each(function () {
            var $me = $(this);
            var left = $me.find('.show_info_left').text().replace(/\s/g, '');
            var right = $me.find('.show_info_right').text();
            if (left == '作者') {
                author = right;
            } else if (left == '出版社') {
                publisher = right;
            } else if (left == '出版时间') {
                publishTime = right;
            } else if (left == '所属分类') {
                category = right;
            }
        });

        var keywordContent = $('meta[name="keywords"]').attr('content');
        var item = {
            url: 'http://product.dangdang.com/' + bookId + '.html',
            id: bookId,
            isbn: keywordContent.substr(keywordContent.lastIndexOf(',') + 1),
            author: author,
            publisher: publisher,
            publishTime: publishTime,
            category: category,
            head_title_name: $('.head_title_name').text(),
            salePriceTag: $('#salePriceTag').text(),
            originalPriceTag: $('#originalPriceTag').text(),
            abstract: $('#abstract').html(),
            content: $('#content').html(),
            authorintro: $('#authorintro').html(),
            catalog: $('#catalog textarea').html(),
            preface: $('#preface textarea').html()
        };
        console.log(item);
        callback(null, item);
    });
}

generateBookIsbn(23353342, function (a) {
});

