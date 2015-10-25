/**
 * Created by dll on 15/6/22.
 */
var express = require('express');
var router = express.Router();
var dangdang_search = require('../api/topBooks');
var school_info = require('../api/school-info');
var book_search = require('../api/book-search');


router.get('/listTopBooks', dangdang_search.listTopBooks);

router.get('/school_list', school_info.list);
router.get('/school_save', school_info.save);

router.get('/book/search', book_search.search);
router.get('/book/stock', book_search.stock);

module.exports = router;