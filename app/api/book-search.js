"use strict"

var iconv = require('iconv-lite');
var supportSchools = require('../models/support-school');

function searchBook(req, res, next) {
    var keyword = req.query.keyword,
        school = req.query.school,
        page = req.query.page;
    if (!keyword || !school) {
        res.status(400).send({
            code: 400,
            message: 'keyword and school  required'
        });
        return;
    }
    if (!page || page < 0) {
        page = 1;
    }


    var search = require('../services/school/' + school);

    search.search(school, keyword, page, function (err, data) {
        if (err) {
            res.status(500).send({
                code: 500,
                message: 'some thing wrong,fixing!',
                detail: err
            });
            return;
        } else {
            res.json({
                code: 200,
                data: data
            });
        }
    });
}

function searchStock(req, res, next) {
    var school = req.query.school,
        sid = req.query.sid;
    if (!school || !sid) {
        res.status(400).send({
            code: 400,
            message: 'sid and school  required'
        });
        return;
    }
    var search = require('../services/school/' + school);
    search.stock(school, sid, function (err, data) {
        if (err) {
            res.status(500).send({
                code: 500,
                message: 'some thing wrong,fixing!',
                detail: err
            });
            return;
        } else {
            res.json({
                code: 200,
                data: data
            });
        }
    });
}

module.exports = {
    search: searchBook,
    stock: searchStock
}
