/**
 * 从学校图书馆搜索图书信息
 * Created by dll on 15/9/27.
 */
var request = require("request");
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var debug = require('debug')('api:dangdang');

var libraryTemplate = require("../../models/libraryTemplate");

function searchBooksFromSchool(code, keyword, callback) {
    console.log("get keword:"+keyword);
    var url = libraryTemplate[code].api.searchUrl;
    var parameter = libraryTemplate[code].api.searchParameter;
    parameter = parameter.replace(/{keyword}/g, keyword);
    var encoding = libraryTemplate[code].encoding;
    var requestUrl = url + "?" + parameter;
    var options = {
        url: requestUrl,
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        }
    };

    request(options, function (err, res) {
        if (err) return callack;

        var html = iconv.decode(res.body, encoding);

        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(html);

        var datas = [];
        $(libraryTemplate[code].selecter.elements).each(function () {
            var $me = $(this);
            var sid = $me.find(libraryTemplate[code].selecter.element.sid.selecter).attr(libraryTemplate[code].selecter.element.sid.attr);
            sid = sid.replace(libraryTemplate[code].selecter.element.sid.replaceAllText, "");

            var isbn = $me.find(libraryTemplate[code].selecter.element.isbn.selecter).slice(libraryTemplate[code].selecter.element.isbn.sliceStart, libraryTemplate[code].selecter.element.isbn.sliceEnd).text().trim();
            isbn = isbn.replace(new RegExp(libraryTemplate[code].selecter.element.isbn.replaceAllText, "g"), "");

            //以下内容可选
            var title = $me.find(libraryTemplate[code].selecter.element.title.selecter).slice(libraryTemplate[code].selecter.element.title.sliceStart, libraryTemplate[code].selecter.element.title.sliceEnd).text().trim();
            title = title.replace(new RegExp(libraryTemplate[code].selecter.element.title.replaceAllText, "g"), "");

            var publisher = $me.find(libraryTemplate[code].selecter.element.publisher.selecter).slice(libraryTemplate[code].selecter.element.publisher.sliceStart, libraryTemplate[code].selecter.element.publisher.sliceEnd).text().trim();
            //publisher = publisher.replace(new RegExp(libraryTemplate[code].selecter.element.publisher.replaceAllText, "g"), "");

            var pubDate = $me.find(libraryTemplate[code].selecter.element.pubDate.selecter).slice(libraryTemplate[code].selecter.element.pubDate.sliceStart, libraryTemplate[code].selecter.element.pubDate.sliceEnd).text().trim();
            pubDate = pubDate.replace(new RegExp(libraryTemplate[code].selecter.element.pubDate.replaceAllText, "g"), "");

            var author = $me.find(libraryTemplate[code].selecter.element.author.selecter).slice(libraryTemplate[code].selecter.element.author.sliceStart, libraryTemplate[code].selecter.element.author.sliceEnd).text().trim();
            //author = author.replace(new RegExp(libraryTemplate[code].selecter.element.author.replaceAllText, "g"), "");

            var data = {
                sid: sid,
                isbn: isbn,
                author: author,
                publisher: publisher,
                pubDate: pubDate,
                title: title
            };
            datas.push(data);

        });
        callback(err, datas);
    });
}

module.exports = {
    search: searchBooksFromSchool
};