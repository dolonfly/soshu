"use strict"

/**
 * 从学校图书馆搜索图书信息
 * Created by dll on 15/9/27.
 */
var request = require("request");
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var urlEncode4Ascii = require('../../utils/UrlEncode4Ascii');

function searchBooksFromSchool(code, keyword, page, callback) {
    var keyword = urlEncode4Ascii.urlEncode4Ascii(keyword);
    var url = "http://202.196.33.227:8080/opac_two/search2/searchout.jsp?opacsearchSw={keyword}&suchen_type=1&kind=simple&show_type=wenzi&snumber_type=Y&search_no_type=Y&suchen_word={keyword}&curpage={page}";
    var encoding = "gbk";
    var requestUrl = url.replace(/{keyword}/g, keyword).replace(/{page}/g, page);
    var options = {
        url: requestUrl,
        encoding: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36',
            'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
        },
        timeout: 5000,
    };

    request(options, function (err, res) {
        if (err) return callback(err);

        var html = iconv.decode(res.body, encoding);

        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(html);

        var datas = [];
        $('div[id=searchout_tuwen] table tr[class]').each(function () {
            var $me = $(this);
            var sid = $me.find('a').attr('href');
            sid = sid.replace('s_detail.jsp?sid=', "");

            var isbn = $me.find('td').slice(4, 5).text().trim();
            isbn = isbn.replace(new RegExp('-', "g"), "");

            //以下内容可选
            var title = $me.find('td').slice(1, 2).text().trim();

            var publisher = $me.find('td').slice(3, 4).text().trim();

            var pubDate = $me.find('td').slice(5, 6).text().trim();

            var author = $me.find('td').slice(2, 3).text().trim();

            var totleNum = $('span[class=opac_red]').slice(0, 1).text();
            var curpage = $('span[class=opac_red]').slice(2, 3).text();
            var pages = $('span[class=opac_red]').slice(3, 4).text();

            var data = {
                sid: sid,
                isbn: isbn,
                author: author,
                publisher: publisher,
                pubDate: pubDate,
                title: title,
                page: {
                    curpage: curpage,
                    pages: pages,
                    totleNum: totleNum
                }
            };
            datas.push(data);

        });
        callback(err, datas);
    });
}

module.exports = {
    search: searchBooksFromSchool
};

//searchBooksFromSchool('zut', 'java', 1, function (err, res) {
//    console.log(res);
//});