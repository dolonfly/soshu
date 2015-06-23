/**
 * Created by dll on 15/6/22.
 */
"use strict";

var perrier = require('perrier');
var _ = require("lodash");
var path = require("path");

function initSoshuConfig(opts) {
    var soshuConfig = {};
    var config = perrier.create({
        rootPath: opts.rootPath,
        globalFields: {
            NODE_ENV: opts.env,
            ROOT_DIR: path.join(opts.rootPath, "..")
        },
        monitor: function (err, fileName) {
            if (err) {
                throw new Error("can not load config file " + fileName, err);
            }
            console.log("load config successfully: " + fileName);
        }
    });
    config.merge(
        'base.json',
        opts.env + '.json'
    );
    _.assign(soshuConfig, config);
    return soshuConfig;
}

var config = initSoshuConfig({
    rootPath: path.join(__dirname, "..", 'config'),
    env: process.env.NODE_ENV || 'dev'
});

module.exports = config;