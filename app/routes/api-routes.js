/**
 * Created by dll on 15/6/22.
 */
var express = require('express');
var router = express.Router();
var dangdang_search = require('../api/topBooks');

router.get('/listTopBooks', dangdang_search.listTopBooks);

module.exports = router;