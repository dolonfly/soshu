"use strict"

var search = require('../services/school/search');

function searchBook(req, res, next) {
    var keyword = req.query.keyword,
        school = req.query.school;
    if (!keyword||!school) {
        res.status(400).send({
            code: 400,
            message: 'keyword and school  required'
        });
        return;
    }
    search.search(school, keyword, function (err, data) {
        if (err) {
            res.status(500).send({
                code: 500,
                message: 'some thing wrong,fixing!'
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
    search: searchBook
}