/**
 * Created by dll on 15/6/22.
 */
"use strict";

function demo(req, res, next) {
    res.render('demo/index', { title: 'Express' });
}

module.exports = {
    get: demo
};