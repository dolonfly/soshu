/**
 * Created by dll on 15/6/22.
 */
var express = require('express');
var router = express.Router();

var demoController = require("../web/demo-controller");

router.get('/demo', demoController.get);

module.exports = router;