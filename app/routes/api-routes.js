/**
 * Created by dll on 15/6/22.
 */
var express = require('express');
var router = express.Router();
var dangdang_search = require('../api/topBooks');

router.get('/top/dangdang', dangdang_search.searchTopBooks);
router.get('/top/dangdang/:bookId', dangdang_search.searchFullBookDetail);

module.exports = router;